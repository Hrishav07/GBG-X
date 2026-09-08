import math
import re
from collections import Counter
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

DB_CONFIG = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': '',
    'database': 'gbgx_db'
}

# ---------------------------------------------------------------------------
# PURE-PYTHON TF-IDF & COSINE SIMILARITY (ZERO DLL / ZERO SCIPY DEPENDENCIES)
# ---------------------------------------------------------------------------

STOP_WORDS = {
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are',
    'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but',
    'by', 'can', 'did', 'do', 'does', 'doing', 'don', 'down', 'during', 'each', 'few', 'for',
    'from', 'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself',
    'him', 'himself', 'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself',
    'just', 'me', 'more', 'most', 'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off',
    'on', 'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
    's', 'same', 'she', 'should', 'so', 'some', 'such', 't', 'than', 'that', 'the', 'their',
    'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those',
    'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what',
    'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'you', 'your'
}

def tokenize(text):
    """Clean and extract alphanumeric tokens, removing common stopwords."""
    words = re.findall(r'\b[a-zA-Z0-9_-]+\b', str(text).lower())
    return [w for w in words if w not in STOP_WORDS and len(w) > 1]

def compute_tfidf_vectors(documents):
    """
    Computes standard TF-IDF sparse vectors for a list of document strings
    without requiring numpy, scipy, or scikit-learn.
    """
    tokenized_docs = [tokenize(doc) for doc in documents]
    num_docs = len(tokenized_docs)

    # Document Frequency (DF)
    doc_freq = Counter()
    for tokens in tokenized_docs:
        for unique_term in set(tokens):
            doc_freq[unique_term] += 1

    # Inverse Document Frequency (IDF) with smooth idf formula
    idf = {
        term: math.log((num_docs + 1) / (df + 1)) + 1.0
        for term, df in doc_freq.items()
    }

    # Build normalized TF-IDF vector for each document
    vectors = []
    for tokens in tokenized_docs:
        if not tokens:
            vectors.append({})
            continue

        term_counts = Counter(tokens)
        total_terms = len(tokens)

        # Term Frequency * IDF
        vec = {}
        for term, count in term_counts.items():
            tf = count / total_terms
            vec[term] = tf * idf.get(term, 1.0)

        # L2 Vector Normalization
        norm = math.sqrt(sum(val ** 2 for val in vec.values()))
        if norm > 0:
            vec = {term: val / norm for term, val in vec.items()}

        vectors.append(vec)

    return vectors

def cosine_similarity_sparse(vec_a, vec_b):
    """Dot product of two L2-normalized sparse term frequency dicts."""
    common_terms = set(vec_a.keys()) & set(vec_b.keys())
    return sum(vec_a[t] * vec_b[t] for t in common_terms)

# ---------------------------------------------------------------------------
# DATABASE LOADER & API HANDLERS
# ---------------------------------------------------------------------------

def fetch_products():
    """Fetch products and build searchable metadata corpus."""
    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT p.id, p.brand, p.name, p.specs, p.price, p.description, c.name AS category 
            FROM products p 
            JOIN categories c ON p.category_id = c.id
        """
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()
        conn.close()

        # Build combined metadata string for similarity matching
        for item in rows:
            item['metadata'] = (
                f"{item.get('category', '')} {item.get('brand', '')} "
                f"{item.get('name', '')} {item.get('specs', '')} "
                f"{item.get('description', '')}"
            )
        return rows
    except Exception as e:
        print(f"[GBGX DB Error] Could not connect to MySQL: {e}")
        return []

@app.route('/recommend', methods=['GET'])
def recommend():
    product_id = request.args.get('product_id', type=int)
    limit = request.args.get('limit', default=4, type=int)

    if not product_id:
        return jsonify({"error": "product_id parameter is required"}), 400

    products = fetch_products()
    if not products:
        return jsonify({"target_product_id": product_id, "recommended_ids": []})

    # Locate target product
    target_idx = None
    for idx, prod in enumerate(products):
        if prod['id'] == product_id:
            target_idx = idx
            break

    if target_idx is None:
        return jsonify({"error": f"Product ID {product_id} not found"}), 404

    # Compute TF-IDF across all product metadata
    documents = [p['metadata'] for p in products]
    vectors = compute_tfidf_vectors(documents)
    target_vec = vectors[target_idx]

    # Calculate similarity scores against all other products
    scores = []
    for idx, vec in enumerate(vectors):
        if idx == target_idx:
            continue
        sim = cosine_similarity_sparse(target_vec, vec)
        scores.append((products[idx]['id'], sim))

    # Sort descending by relevance score
    scores.sort(key=lambda x: x[1], reverse=True)
    recommended_ids = [pid for pid, _ in scores[:limit]]

    return jsonify({
        "target_product_id": product_id,
        "recommended_ids": recommended_ids
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "service": "GBGX Pure-Python Recommender"})

if __name__ == '__main__':
    print("=" * 60)
    print("GBGX RECOMMENDATION SERVICE (Pure-Python TF-IDF Engine)")
    print("Zero C-Extensions • Zero DLL Dependencies • Port: 5000")
    print("=" * 60)
    app.run(host='127.0.0.1', port=5000, debug=True)