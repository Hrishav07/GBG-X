import React, { useState, useEffect, useRef } from 'react';

// ================= INTRO ANIMATION PRELOADER (WITH SVG ICONS) =================
function IntroLoader({ onComplete }) {
  const [stage, setStage] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1200);
    const t2 = setTimeout(() => setStage(2), 2400);
    const t3 = setTimeout(() => setStage(3), 3600);
    const t4 = setTimeout(() => setFadeOut(true), 5000);
    const t5 = setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current();
    }, 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const LoaderIcons = {
    Scooter: () => (
      <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#e8e6ed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="18" r="3"/><circle cx="19" cy="18" r="3"/>
        <path d="M5 18H9l4-9h4l2 4"/><path d="M12 9l3-4h3"/>
      </svg>
    ),
    Apparel: () => (
      <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
      </svg>
    ),
    Battery: () => (
      <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="12" x="2" y="6" rx="2"/><line x1="22" x2="22" y1="10" y2="14"/>
        <line x1="10" x2="10" y1="9" y2="15"/><line x1="7" x2="13" y1="12" y2="12"/>
      </svg>
    )
  };

  const stagesData = [
    { label: "INITIALIZING EV COMMUTE", sub: "Aero-Step Electric Dynamics", icon: <LoaderIcons.Scooter />, accent: "#eeeef0" },
    { label: "SYNCING RIDER SAFETY GEAR", sub: "CE Level 2 Certified Armor", icon: <LoaderIcons.Apparel />, accent: "#f59e0b" },
    { label: "CHARGING AIS-156 POWER CELL", sub: "Smart CAN-BMS 72V Architecture", icon: <LoaderIcons.Battery />, accent: "#3b82f6" }
  ];

  return (
    <>
      <style>{`
        @keyframes gbgxRotate3D {
          0% { transform: perspective(800px) rotateY(0deg) scale(0.94); }
          50% { transform: perspective(800px) rotateY(180deg) scale(1.06); }
          100% { transform: perspective(800px) rotateY(360deg) scale(0.94); }
        }
        @keyframes gbgxRingSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gbgxPulseGlow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.1); }
        }
        @keyframes gbgxLogoZoomIn {
          0% { transform: scale(0.65); opacity: 0; filter: blur(8px); }
          60% { transform: scale(1.1); opacity: 1; filter: blur(0px); }
          85% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.35); opacity: 0; filter: blur(5px); }
        }
        @keyframes gbgxStageFade {
          0% { opacity: 0; transform: scale(0.85); }
          15% { opacity: 1; transform: scale(1); }
          85% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.08); }
        }
      `}</style>

      <div style={{
        position: 'fixed', inset: 0, backgroundColor: '#09090b', zIndex: 99999,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', opacity: fadeOut ? 0 : 1, transform: fadeOut ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: fadeOut ? 'none' : 'auto'
      }}>
        <div style={{
          position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
          background: stage === 3 ? 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0) 70%)' : `radial-gradient(circle, ${stagesData[stage]?.accent}33 0%, rgba(0,0,0,0) 70%)`,
          filter: 'blur(60px)', animation: 'gbgxPulseGlow 3s ease-in-out infinite', transition: 'background 0.4s ease'
        }} />

        {stage < 3 && (
          <div key={stage} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2, animation: 'gbgxStageFade 1.3s ease-in-out forwards' }}>
            <div style={{ position: 'absolute', width: '210px', height: '210px', borderRadius: '50%', border: `2px dashed ${stagesData[stage].accent}66`, animation: 'gbgxRingSpin 6s linear infinite', pointerEvents: 'none' }} />
            <div style={{ width: '140px', height: '140px', borderRadius: '32px', backgroundColor: '#121216', border: `1px solid ${stagesData[stage].accent}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 35px ${stagesData[stage].accent}25`, animation: 'gbgxRotate3D 2.6s ease-in-out infinite alternate', willChange: 'transform' }}>
              {stagesData[stage].icon}
            </div>
            <div style={{ textAlign: 'center', marginTop: '35px' }}>
              <div style={{ fontSize: '11.5px', fontWeight: '900', letterSpacing: '2px', color: stagesData[stage].accent, textTransform: 'uppercase', marginBottom: '5px' }}>
                {stagesData[stage].label}
              </div>
              <div style={{ fontSize: '9.5px', color: '#a1a1aa', letterSpacing: '0.8px' }}>
                {stagesData[stage].sub}
              </div>
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '18px' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: stage === i ? '22px' : '6px', height: '4px', borderRadius: '2px', backgroundColor: stage === i ? stagesData[stage].accent : '#27272a', transition: 'all 0.3s ease' }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {stage === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2, animation: 'gbgxLogoZoomIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
            <img src="/GBGX_logo_black_transparent.png" alt="GBGX Logo" onError={(e) => { e.target.style.display = 'none'; }} style={{ height: '52px', width: 'auto', filter: 'invert(1) drop-shadow(0 0 25px rgba(255,255,255,0.6))', display: 'block', marginBottom: '16px' }} />
            <div style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '4px', color: '#ffffff', textTransform: 'uppercase' }}>GBGX</div>
            <div style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '3px', color: '#120aa7', textTransform: 'uppercase', marginTop: '6px' }}>The New Era of Mobility</div>
          </div>
        )}

        <button onClick={onComplete} style={{ position: 'absolute', bottom: '24px', right: '24px', background: 'none', border: '1px solid #27272a', color: '#71717a', padding: '6px 14px', borderRadius: '9999px', fontSize: '9.5px', fontWeight: '700', cursor: 'pointer', zIndex: 10, letterSpacing: '1px' }}>
          SKIP INTRO →
        </button>
      </div>
    </>
  );
}

// ================= AUTH MODAL COMPONENT (SIGNUP JUMPS TO SIGNIN) =================
function AuthModal({ isOpen, onClose, initialMode = 'signup', onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [signupSuccessNotice, setSignupSuccessNotice] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setSignupSuccessNotice(false);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // IF SIGN UP: validate inputs, reset passwords, and JUMP TO SIGN IN
    if (mode === 'signup') {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      if (!agreedTerms) {
        alert("Please agree to the terms of service.");
        return;
      }
      
      setMode('signin');
      setPassword('');
      setConfirmPassword('');
      setSignupSuccessNotice(true);
      return;
    }

    // IF SIGN IN: Authenticate user & complete session
    const userName = emailOrPhone.includes('@') 
      ? emailOrPhone.split('@')[0] 
      : (emailOrPhone || "Rohan (#GBGX)");
    
    onAuthSuccess(userName);
    setSignupSuccessNotice(false);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 100000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '880px',
        backgroundColor: '#1b1d21',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 30px 70px rgba(0,0,0,0.6)',
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#71757f',
            cursor: 'pointer',
            padding: '4px',
            zIndex: 10
          }}
        >
          <Icons.Close />
        </button>

        {/* LEFT COLUMN: BOTANICAL GREEN LEAF BANNER */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '480px',
          backgroundImage: `url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center left'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(27,29,33,0.85) 100%)'
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            zIndex: 2
          }}>
            <span style={{
              fontSize: '10px',
              fontWeight: '800',
              letterSpacing: '1.5px',
              color: '#382178',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(6px)',
              padding: '4px 10px',
              borderRadius: '6px'
            }}>
              100% Clean Mobility
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: FORM & SOCIAL NETWORKS */}
        <div style={{
          padding: '36px 44px 28px 44px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* TOP NAV TABS */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button
              onClick={() => { setMode('signup'); setSignupSuccessNotice(false); }}
              style={{
                backgroundColor: mode === 'signup' ? '#292b32' : 'transparent',
                color: mode === 'signup' ? '#ffffff' : '#6f7480',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Sign up
            </button>

            <button
              onClick={() => { setMode('signin'); setSignupSuccessNotice(false); }}
              style={{
                backgroundColor: mode === 'signin' ? '#292b32' : 'transparent',
                color: mode === 'signin' ? '#ffffff' : '#6f7480',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                marginRight: '36px',
                transition: 'all 0.15s ease'
              }}
            >
              Sign in
            </button>
          </div>

          {/* Jump-to-signin Success Notice Banner */}
          {signupSuccessNotice && mode === 'signin' && (
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#25187e',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '10.5px',
              fontWeight: '700',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>✓</span>
              <span>Account created successfully! Please sign in with your password.</span>
            </div>
          )}

          {/* FORM BODY */}
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: '30px', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: '10px', color: '#6f7480', fontWeight: '700', textTransform: 'lowercase', marginBottom: '8px' }}>
                  welcome
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff', lineHeight: 1.25, letterSpacing: '-0.4px' }}>
                  {mode === 'signup' ? (
                    <>Fill the form<br />to become<br />part of<br />team</>
                  ) : (
                    <>Welcome<br />back to the<br />clean EV<br />revolution</>
                  )}
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                  backgroundColor: '#262930',
                  borderRadius: '8px',
                  padding: '11px 16px',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <input 
                    type="text"
                    required
                    placeholder="E-mail or Phone"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: '500'
                    }}
                  />
                </div>

                <div style={{
                  backgroundColor: '#262930',
                  borderRadius: '8px',
                  padding: '11px 16px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <input 
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '90%',
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: '500'
                    }}
                  />
                  <span style={{ color: '#5f6470', fontSize: '11px' }}>🔒</span>
                </div>

                {mode === 'signup' && (
                  <div style={{
                    backgroundColor: '#262930',
                    borderRadius: '8px',
                    padding: '11px 16px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <input 
                      type="password"
                      required
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{
                        width: '90%',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: '500'
                      }}
                    />
                    <span style={{ color: '#5f6470', fontSize: '11px' }}>🔒</span>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  <input 
                    type="checkbox"
                    id="gbgx-terms"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    style={{ accentColor: '#ffd8a8', width: '13px', height: '13px', cursor: 'pointer' }}
                  />
                  <label htmlFor="gbgx-terms" style={{ fontSize: '10px', color: '#7c818e', cursor: 'pointer' }}>
                    {mode === 'signup' ? 'I agree to the terms of service' : 'Keep me signed in on this device'}
                  </label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '8px' }}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#fde0b2',
                      color: '#1a1b1e',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 24px',
                      fontSize: '11.5px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>Go</span>
                    <span style={{ fontSize: '12px' }}>➔</span>
                  </button>

                  <div style={{ fontSize: '9px', color: '#6f7480', lineHeight: 1.35 }}>
                    {mode === 'signup' ? (
                      <>Do you already have the password? Please use the <span onClick={() => { setMode('signin'); setSignupSuccessNotice(false); }} style={{ color: '#fde0b2', textDecoration: 'underline', cursor: 'pointer' }}>login form</span></>
                    ) : (
                      <>Don't have an account yet? Please use the <span onClick={() => { setMode('signup'); setSignupSuccessNotice(false); }} style={{ color: '#fde0b2', textDecoration: 'underline', cursor: 'pointer' }}>sign up form</span></>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </form>

          {/* SOCIAL NETWORKS BAR */}
          <div style={{
            borderTop: '1px solid #282a31',
            paddingTop: '16px',
            marginTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '10px', color: '#5f6470', fontWeight: '700', textTransform: 'lowercase' }}>
              social networks
            </span>

            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { name: 'Facebook', icon: 'f' },
                { name: 'Apple', icon: '' },
                { name: 'X', icon: '𝕏' },
                { name: 'Google', icon: 'G' }
              ].map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => alert(`Sign in with ${s.name} is currently in demo mode.`)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#292c34',
                    color: '#9da3b4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#18181b'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#292c34'; e.currentTarget.style.color = '#9da3b4'; }}
                >
                  {s.icon}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ================= SCROLL REVEAL WRAPPER COMPONENT =================
function Reveal({ children, delay = 0, direction = 'up', style = {}, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return 'none';
    switch (direction) {
      case 'up': return 'translateY(36px)';
      case 'down': return 'translateY(-36px)';
      case 'left': return 'translateX(36px)';
      case 'right': return 'translateX(-36px)';
      case 'scale': return 'scale(0.94)';
      default: return 'translateY(36px)';
    }
  };

  return (
    <div
      ref={domRef}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}

// ================= ATTRIBUTE-BASED COSINE SIMILARITY ENGINE =================
function tokenizeAndVectorizeAttributes(product) {
  const attributeCorpus = [
    product.color || '',
    product.color || '',
    product.features || '',
    product.compatibility || '',
    product.compatibility || '',
    product.specs || '',
    product.brand || '',
    product.description || ''
  ].join(' ').toLowerCase();

  const tokens = attributeCorpus.match(/\b[a-z0-9_-]+\b/g) || [];
  const termFreq = {};
  tokens.forEach(token => {
    if (token.length > 1) {
      termFreq[token] = (termFreq[token] || 0) + 1;
    }
  });
  return termFreq;
}

function calculateAttributeCosineSimilarity(productA, productB) {
  const vecA = tokenizeAndVectorizeAttributes(productA);
  const vecB = tokenizeAndVectorizeAttributes(productB);

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  const allTerms = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  allTerms.forEach(term => {
    const valA = vecA[term] || 0;
    const valB = vecB[term] || 0;
    dotProduct += valA * valB;
    normA += valA * valA;
    normB += valB * valB;
  });

  if (normA === 0 || normB === 0) return 0.5;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Precision SVGs
const Icons = {
  Search: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Mic: ({ listening }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={listening ? "#ef4444" : "none"} stroke={listening ? "#ef4444" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
  ),
  User: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
  ),
  Sun: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
  ),
  Moon: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
  ),
  Heart: ({ active }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={active ? "#e11d48" : "none"} stroke={active ? "#e11d48" : "currentColor"} strokeWidth="1.8"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  ),
  Bag: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  ),
  Play: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
  ),
  Star: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  ),
  Truck: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="1.8"><rect width="14" height="10" x="1" y="5" rx="2"/><path d="M15 10h4l3 3v2h-7v-5z"/><circle cx="5.5" cy="17.5" r="2.5"/><circle cx="18.5" cy="17.5" r="2.5"/></svg>
  ),
  Zap: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Shield: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  ArrowRight: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  ),
  ArrowLeft: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
  ),
  Close: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
  ),
  Instagram: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  Facebook: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  YouTube: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/></svg>
  ),
  LinkedIn: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  TwitterX: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  ),
  AtherLogo: () => (
    <svg width="22" height="22" viewBox="0 0 100 100" fill="currentColor">
      <path d="M50 5 L90 85 L72 85 L50 40 L28 85 L10 85 Z" /><polygon points="50,55 60,78 40,78" fill="#2f2989" />
    </svg>
  ),
  OlaLogo: () => (
    <svg width="24" height="20" viewBox="0 0 100 80" fill="currentColor">
      <ellipse cx="50" cy="40" rx="36" ry="24" fill="none" stroke="currentColor" strokeWidth="12" /><circle cx="50" cy="40" r="10" fill="#181e74" />
    </svg>
  ),
  TVSLogo: () => (
    <svg width="32" height="18" viewBox="0 0 100 60" fill="currentColor">
      <path d="M5 10 L40 10 L25 50 L10 50 Z" />
      <path d="M45 10 L65 42 L85 10 L98 10 L75 50 L55 50 L35 18 Z" /><polygon points="85,38 98,38 94,50 81,50" fill="#ef4444" />
    </svg>
  ),
  ChetakLogo: () => (
    <svg width="22" height="22" viewBox="0 0 100 100" fill="currentColor">
      <path d="M20 75 C 20 40, 50 15, 80 15 C 65 35, 65 60, 80 75 C 55 62, 35 62, 20 75 Z" /><circle cx="58" cy="42" r="7" fill="#3b82f6" />
    </svg>
  )
};

// ================= MASTER PRODUCT CATALOG WITH ATTRIBUTES =================
const MASTER_PRODUCTS = [
  // High-Speed EV Scooters
  {
    id: 1,
    name: "Ather 450X Gen 3",
    brand: "Ather Energy",
    category: "EV-Scooters",
    subCategory: "scooter",
    type: "High-Speed",
    badge: "BESTSELLER",
    price: 142999,
    rating: 4.9,
    reviewsCount: 312,
    speed: "90 km/h",
    range: "150 km IDC",
    battery: "3.7 kWh",
    color: "Space Grey / Mint Green Accents",
    features: "7-inch Touchscreen Navigation, Warp Mode, Fast Charging, Bluetooth App, IP67 Waterproof, Regen Braking",
    compatibility: "Ather Grid Fast Charger, 72V Smart Packs, Bluetooth Intercom Helmets, QC 3.0 Mobile Mounts",
    specs: "150 km IDC • 90 km/h • 3.7 kWh Pack",
    description: "India's premier performance electric scooter with 7-inch touchscreen dashboard, Google Maps navigation, warp mode acceleration, IP67 waterproof Lithium battery, and fast charging.",
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Ola S1 Pro Gen 2",
    brand: "Ola Electric",
    category: "EV-Scooters",
    subCategory: "scooter",
    type: "High-Speed",
    badge: "HOT",
    price: 134999,
    rating: 4.8,
    reviewsCount: 450,
    speed: "120 km/h",
    range: "195 km IDC",
    battery: "4.0 kWh",
    color: "Midnight Black / Silver",
    features: "MoveOS 4, Cruise Control, Proximity Auto-Unlock, Party Mode Sound, Monoshock Suspension",
    compatibility: "Ola Hypercharger, 72V NMC Lithium Packs, Cordura Riding Jackets, Carbon Shield Gloves",
    specs: "195 km IDC • 120 km/h • 4.0 kWh",
    description: "Equipped with MoveOS 4, cruise control, proximity auto-unlock, party mode sound speaker system, and class-leading highway top speed.",
    img: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "TVS iQube ST",
    brand: "TVS Motor",
    category: "EV-Scooters",
    subCategory: "scooter",
    type: "High-Speed",
    badge: "FAMILY PICK",
    price: 129000,
    rating: 4.8,
    reviewsCount: 215,
    speed: "82 km/h",
    range: "145 km IDC",
    battery: "3.4 kWh",
    color: "Titanium Grey / Glossy Black",
    features: "SmartXonnect, Touch-assist Parking, Huge Underseat Storage, Flip Key, Dual Rear Shocks",
    compatibility: "TVS Fast Hubs, 60V Swappable Packs, DOT Certified Helmets, Handlebar Phone Mounts",
    specs: "145 km IDC • 82 km/h • 3.4 kWh",
    description: "Spacious family electric scooter featuring dual rear suspension, massive under-seat luggage area, and connected vehicle telematics.",
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 101,
    name: "Simple One",
    brand: "Simple Energy",
    category: "EV-Scooters",
    subCategory: "scooter",
    type: "High-Speed",
    badge: "212 KM RANGE",
    price: 158000,
    rating: 4.9,
    reviewsCount: 140,
    speed: "105 km/h",
    range: "212 km IDC",
    battery: "5.0 kWh Dual",
    color: "Brazen Black / Azure Blue",
    features: "Dual Removable Packs, 212 km Range, 4 Ride Modes, Fast Charging Ready, Alloy Wheels",
    compatibility: "72V Long Range LFP Packs, High-Vis All-Weather Jackets, Bluetooth Phone Claws",
    specs: "105 km/h • 5 kWh Pack • 212 km IDC",
    description: "Industry-leading real range electric scooter featuring a removable plus fixed dual battery setup and futuristic alloy styling.",
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=500&q=80"
  },

  // Low-Speed EV Scooters (Non-RTO)
  {
    id: 4,
    name: "Hero Eddy City Commuter",
    brand: "Hero Electric",
    category: "EV-Scooters",
    subCategory: "scooter",
    type: "Low-Speed",
    badge: "NON-RTO",
    price: 72000,
    rating: 4.7,
    reviewsCount: 195,
    speed: "25 km/h",
    range: "85 km IDC",
    battery: "1.5 kWh Removable",
    color: "Vibrant Cyan / Arctic White",
    features: "No License Needed, Non-RTO, Portable Plug-in Battery, Digital Instrument Cluster, USB Port",
    compatibility: "48V City Runabout Battery Packs, Lightweight DOT Helmets, Anti-Slip Commuter Gloves",
    specs: "85 km IDC • 25 km/h • Non-RTO",
    description: "Zero license required, zero road tax. Built for daily grocery runs, campus students, and senior citizens with removable plug-and-play charging.",
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 201,
    name: "Okinawa Lite Smart",
    brand: "Okinawa",
    category: "EV-Scooters",
    subCategory: "scooter",
    type: "Low-Speed",
    badge: "NO LICENSE",
    price: 66999,
    rating: 4.6,
    reviewsCount: 135,
    speed: "25 km/h",
    range: "60 km IDC",
    battery: "1.25 kWh",
    color: "Sparkling Red / White",
    features: "LED Projector Lamps, Push Button Start, Auto Repair Switch, Anti-Theft Lock",
    compatibility: "48V Swappable Battery, Urban Riding Gear, Claw Grip Mobile Holders",
    specs: "25 km/h • Push Start • 60 km Range",
    description: "Ultra-compact city electric scooter with LED projector headlights, push button start, and regenerative braking assistance.",
    img: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=500&q=80"
  },

  // Accessories - Helmets
  {
    id: 301,
    name: "Steelbird SBA-7 7Wings DOT Helmet",
    brand: "Steelbird",
    category: "Accessories",
    subCategory: "Helmet",
    price: 3499,
    rating: 4.8,
    reviewsCount: 520,
    color: "Matte Black / Neon Green Graphics",
    features: "Dual Visor, Quick Release Micrometric Buckle, Anti-Fog Coating, ISI & DOT Certified, High Impact EPS",
    compatibility: "Ather, Ola, TVS EV Scooters, Rynox Air GT4 Jackets, Tornado Pro 3 Gloves",
    specs: "ISI & DOT Certified • Dual Visor",
    description: "High-impact virgin grade ABS shell with dual visor mechanism, anti-fog lens coating, and air flow ventilation ports.",
    img: "https://images.unsplash.com/photo-1558981854-325d762e5ca5?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 302,
    name: "Axor Apex Hunter Helmet",
    brand: "Axor",
    category: "Accessories",
    subCategory: "Helmet",
    price: 4999,
    rating: 4.9,
    reviewsCount: 310,
    color: "Midnight Black / Carbon Grey",
    features: "ECE 22.06 & DOT Certified, Pinlock 30 Max Vision, Integrated Spoiler, Emergency Cheek Pad Release",
    compatibility: "High-Speed EV Commuting, MoveOS Connected Scooters, DSG Aero Jackets, Intercom Ready",
    specs: "ECE 22.06 & DOT • Pinlock 30 Max",
    description: "ECE certified aerodynamic performance helmet with rear spoiler, emergency cheek pad release, and optical grade visor.",
    img: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 303,
    name: "Vega Bolt Bunny Black Helmet",
    brand: "Vega",
    category: "Accessories",
    subCategory: "Helmet",
    price: 2199,
    rating: 4.6,
    reviewsCount: 420,
    color: "Glossy Black / Cyan Accents",
    features: "Aerodynamic Shell, Removable Washable Padding, Scratch Resistant Visor, ISI Certified",
    compatibility: "City Commuter EVs, Hero Eddy, Okinawa Lite, Probiker Gloves",
    specs: "Aerodynamic Shell • Removable Padding",
    description: "Lightweight commuter helmet with scratch-resistant coated visor and high-impact virgin ABS material.",
    img: "https://images.unsplash.com/photo-1578874691223-a49626e80062?auto=format&fit=crop&w=500&q=80"
  },

  // Accessories - Jackets
  {
    id: 304,
    name: "Rynox Air GT4 All-Weather Jacket",
    brand: "Rynox",
    category: "Accessories",
    subCategory: "Jacket",
    price: 6250,
    rating: 4.9,
    reviewsCount: 110,
    color: "Stealth Black / Neon Green Accents",
    features: "Knox CE Level 2 Armors, Heavy 3D Mesh Ventilation, Waterproof Thermal Rain Liner, Cordura Reinforcements",
    compatibility: "Compatible with Steelbird SBA-7 Helmet, Tornado Pro 3 Gloves, All Highway EV Commutes",
    specs: "CE Level 2 Armors • Heavy Mesh Ventilation",
    description: "Heavy duty mesh riding jacket with Knox CE Level 2 armor protection on shoulders and elbows, plus internal rain liner.",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 305,
    name: "DSG Aero Urban Riding Jacket",
    brand: "DSG",
    category: "Accessories",
    subCategory: "Jacket",
    price: 5499,
    rating: 4.7,
    reviewsCount: 88,
    color: "Midnight Black / Reflective Silver",
    features: "Cordura 600D Fabric, 3M Scotchlite Night Reflective Trim, CE Level 1 Impact Protectors, Ergonomic Waist Adjusters",
    compatibility: "Axor Apex Helmet, Probiker Gloves, All High-Speed EV Scooters",
    specs: "Cordura 600D • Night Reflective Trim",
    description: "Abrasion-resistant 600D Cordura fabric with 3M Scotchlite reflective elements for high night visibility on EV commutes.",
    img: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=500&q=80"
  },

  // Accessories - Gloves
  {
    id: 307,
    name: "Rynox Tornado Pro 3 Gloves",
    brand: "Rynox",
    category: "Accessories",
    subCategory: "Gloves",
    price: 3450,
    rating: 4.8,
    reviewsCount: 230,
    color: "Matte Black / Neon Green Trims",
    features: "Carbon Fiber Knuckle Shield, Touchscreen Conductive Fingertips, Scaphoid Palm Slider, Micro-Velcro Cuff",
    compatibility: "Touchscreen Dashboards (Ather/Ola), BOBO Phone Mounts, Steelbird Helmets, Rynox Jackets",
    specs: "Knuckle Carbon Shield • Touchscreen Tips",
    description: "Full gauntlet gloves featuring real carbon fiber knuckle armor, palm sliders, and conductive fingertip threads for mobile screens.",
    img: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 308,
    name: "Probiker Urban Riding Gloves",
    brand: "Probiker",
    category: "Accessories",
    subCategory: "Gloves",
    price: 899,
    rating: 4.4,
    reviewsCount: 310,
    color: "Black / Red Accents",
    features: "Breathable Mesh, Anti-Slip Palm Dots, Molded Knuckle Guards, Flexible Finger Joints",
    compatibility: "City Commuter Handlebars, Vega Bolt Helmets, BOBO Claw Mounts",
    specs: "Anti-Slip Palm • High Airflow Fabric",
    description: "Breathable daily commuter gloves designed for light city cruising with rubberized grip dots.",
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=500&q=80"
  },

  // Accessories - Phone Holders
  {
    id: 310,
    name: "BOBO Claw Grip with Fast Charger",
    brand: "BOBO",
    category: "Accessories",
    subCategory: "Phone Holder",
    price: 1899,
    rating: 4.9,
    reviewsCount: 650,
    color: "Anodized Matte Black",
    features: "QC 3.0 Quick USB Output, 360 Degree Aluminium Ball Mount, Silicone Claw Grippers, Waterproof Switch",
    compatibility: "Universal Handlebar 22mm-32mm, Ather, Ola, TVS, Hero Electric, Touchscreen Gloves",
    specs: "QC 3.0 Quick USB • 360° Aluminium Ball",
    description: "Anodized CNC aluminium handlebar clamp with built-in Quick Charge 3.0 USB port powered directly from EV converter.",
    img: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=500&q=80"
  },

  // Batteries
  {
    id: 401,
    name: "72V 40Ah Smart NMC Lithium Pack",
    brand: "GBGX Power Pro",
    category: "Batteries",
    subCategory: "battery",
    badge: "FAST CHARGE",
    voltage: "72V",
    capacity: "40Ah (2.88 kWh)",
    warranty: "3 Years Replacement",
    price: 48500,
    oldPrice: 54000,
    rating: 4.9,
    reviewsCount: 85,
    color: "Space Grey / Industrial Silver",
    features: "Smart CAN BMS, Bluetooth App Telemetry, Active Thermal Balancing, AIS-156 Phase 2 Certified, 2000+ Deep Cycles",
    compatibility: "High-Speed EV Scooters, Ather 450X, Ola S1 Pro, Custom High-Torque Builds",
    specs: "Smart CAN BMS • 2000+ Cycles • AIS-156 Phase 2",
    description: "High-density NMC chemistry with thermal isolation barriers, active cell balancing, and Bluetooth smartphone health monitoring.",
    img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 402,
    name: "60V 34Ah Swappable Li-ion Pack",
    brand: "GBGX Power Commute",
    category: "Batteries",
    subCategory: "battery",
    badge: "SWAPPABLE",
    voltage: "60V",
    capacity: "34Ah (2.04 kWh)",
    warranty: "3 Years Warranty",
    price: 38900,
    oldPrice: 42500,
    rating: 4.8,
    reviewsCount: 64,
    color: "Dark Grey / Emerald Green",
    features: "Ergonomic Metal Handle, Swappable Anderson Connector, IP67 Waterproof, Laser Welded Cells",
    compatibility: "GBGX Swap Station Network, TVS iQube, Hero Electric, 60V Commuters",
    specs: "Thermal Runaway Protection • Ergonomic Metal Handle • IP67",
    description: "Lightweight swappable traction battery with laser-welded nickel strips and quick-connect Anderson terminal socket.",
    img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 403,
    name: "48V 28Ah City Runabout Li-ion Pack",
    brand: "Hero & Okinawa OEM",
    category: "Batteries",
    subCategory: "battery",
    badge: "PLUG & PLAY",
    voltage: "48V",
    capacity: "28Ah (1.34 kWh)",
    warranty: "2 Years Replacement",
    price: 26500,
    oldPrice: 29000,
    rating: 4.7,
    reviewsCount: 52,
    color: "Cyan / Light Grey",
    features: "Integrated Overvoltage Cutoff, Lightweight Alloy Shell, Non-RTO Calibration",
    compatibility: "Hero Eddy, Okinawa Lite Smart, 48V Low-Speed Commuters",
    specs: "Integrated Overvoltage Cutoff • Compact Light Alloy Shell",
    description: "Direct replacement pack for low-speed commuters with built-in short circuit and over-discharge prevention.",
    img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 404,
    name: "72V 52Ah Long Range LFP Power Pack",
    brand: "GBGX Endurance",
    category: "Batteries",
    subCategory: "battery",
    badge: "3000+ CYCLES",
    voltage: "72V",
    capacity: "52Ah (3.74 kWh)",
    warranty: "5 Years Pro-rata",
    price: 61999,
    oldPrice: 68500,
    rating: 4.9,
    reviewsCount: 78,
    color: "Metallic Black / Gold Trim",
    features: "Lithium Iron Phosphate (LFP), Thermal Stability up to 55°C, Heavy Commercial Fleet Ready",
    compatibility: "Simple One, High Speed Fleet Scooters, 72V Heavy Duty EV Retrofits",
    specs: "Lithium Iron Phosphate (LFP) • Extreme Thermal Stability up to 55°C",
    description: "Designed for commercial delivery fleets operating under heavy summer ambient temperatures with zero thermal degradation.",
    img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=500&q=80"
  },

  // Spare Parts
  {
    id: 501,
    name: "3kW High-Torque BLDC Hub Motor & FOC Vector Controller",
    brand: "Universal High-Speed OEM",
    category: "Spare Parts",
    subCategory: "part",
    badge: "IP67 WATERPROOF",
    compatibility: "Ather, Ola & Custom Builds",
    price: 18999,
    oldPrice: 21500,
    rating: 4.8,
    reviewsCount: 92,
    color: "Cast Aluminium / Black",
    features: "Vector Sine Wave Driver, 120 Nm Peak Torque, Regen Ready, Neodymium Magnets",
    specs: "Vector Sine Wave Driver • 120 Nm Peak Torque",
    description: "Waterproof hub motor with high-temperature neodymium magnets and matched vector sine wave motor driver for jerk-free takeoff.",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 502,
    name: "Front Disc Caliper & Master Cylinder Pre-Bled Assembly",
    brand: "Ather OEM / Bybre",
    category: "Spare Parts",
    subCategory: "part",
    badge: "GENUINE OEM",
    compatibility: "Ather 450X / 450S / Rizta",
    price: 3499,
    oldPrice: 4200,
    rating: 4.9,
    reviewsCount: 45,
    color: "Gold / Black",
    features: "Ceramic Compound Pads, Pre-Bled DOT 4, Braided Steel Hose, Instant Hydraulic Bite",
    specs: "Ceramic Compound Brake Pads • DOT 4 Pre-Filled",
    description: "Original equipment manufacturer hydraulic braking caliper kit pre-filled with fluid and ready for direct bolt-on replacement.",
    img: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 503,
    name: "72V / 60V to 12V 15A High-Efficiency DC-DC Converter",
    brand: "GBGX Power Electronics",
    category: "Spare Parts",
    subCategory: "part",
    badge: "HEAVY DUTY",
    compatibility: "All Indian Multi-brand EVs",
    price: 1450,
    oldPrice: 1850,
    rating: 4.7,
    reviewsCount: 38,
    color: "Silver Extruded Aluminum",
    features: "Dual Heat Sinks, Stable 15A Output, Waterproof Potting, Short Circuit Isolation",
    specs: "Dual Aluminum Extruded Heat Sinks • Stable 15A Current",
    description: "Heavy duty voltage step-down module delivering clean 12V power to headlamps, indicators, GPS modules, and horns.",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 504,
    name: "Ergonomic Twist Throttle with 3-Speed Mode & Reverse Switch",
    brand: "Hero Electric / Okinawa",
    category: "Spare Parts",
    subCategory: "part",
    badge: "PLUG & PLAY",
    compatibility: "Low & High Speed Commuters",
    price: 799,
    oldPrice: 1100,
    rating: 4.6,
    reviewsCount: 62,
    color: "Textured Black Rubber",
    features: "Hall Sensor Linear Response, Push Reverse Button, 3-Speed Mode Selector",
    specs: "Hall Sensor Linear Response • Push Reverse Toggle",
    description: "Ergonomic throttle grip with dual hall sensor redundancy and integrated toggle buttons for reverse assist and speed mapping.",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80"
  }
];

export default function App() {
  const [loadingIntro, setLoadingIntro] = useState(true);
  const [lang, setLang] = useState('EN');
  const [theme, setTheme] = useState('dark');
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signup'); // 'signup' | 'signin'

  const [hoveredNav, setHoveredNav] = useState(null);

  // Search Engine & Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['Ather 450X', '72V Battery', 'DOT Helmet', 'Ola S1']);
  const [searchCategoryFilter, setSearchCategoryFilter] = useState('All');
  const [isListening, setIsListening] = useState(false);
  const searchContainerRef = useRef(null);

  // Floating Hero Filter Widget State
  const [heroSearchRange, setHeroSearchRange] = useState('All');
  const [heroSearchCity, setHeroSearchCity] = useState('All');

  const [favorites, setFavorites] = useState([1, 4]);
  const [cartCount, setCartCount] = useState(2);
  const [wishlistCount, setWishlistCount] = useState(4);

  // Router State: { page: 'home' | 'category' | 'product' | 'search', categoryName?: string, product?: object, searchQuery?: string }
  const [router, setRouter] = useState({ page: 'home' });

  // Home Page Sub-category states
  const [evTab, setEvTab] = useState('High-Speed');
  const [accessoryTab, setAccessoryTab] = useState('Helmets');
  const [partnerType, setPartnerType] = useState('Dealership');

  // Form States
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribedMsg, setSubscribedMsg] = useState(false);
  const [partnerForm, setPartnerForm] = useState({ name: '', phone: '', city: '', note: '' });
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  // Click outside to dismiss autocomplete search dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set browser title and tab favicon
  useEffect(() => {
    if (router.page === 'product' && router.product) {
      document.title = `${router.product.name} | GBGX Electric Mobility`;
    } else if (router.page === 'category') {
      document.title = `${router.categoryName} Catalog | GBGX`;
    } else if (router.page === 'search') {
      document.title = `Search: "${router.searchQuery}" | GBGX`;
    } else {
      document.title = "GBGX | Electric Mobility & EV Scooters India";
    }

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = '/GBGX_logo_black_transparent.png';
  }, [router, theme]);

  const toggleFav = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const executeSearch = (queryOverride) => {
    const queryToSearch = (queryOverride !== undefined ? queryOverride : searchQuery).trim();
    if (!queryToSearch) return;

    setSearchQuery(queryToSearch);
    setIsSearchFocused(false);

    setRecentSearches(prev => [
      queryToSearch,
      ...prev.filter(item => item.toLowerCase() !== queryToSearch.toLowerCase())
    ].slice(0, 5));

    setSearchCategoryFilter('All');
    setRouter({ page: 'search', searchQuery: queryToSearch });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser. Please use Google Chrome, Edge, or Safari.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'HI' ? 'hi-IN' : 'en-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setSearchQuery(transcript);
      executeSearch(transcript);
    };
    recognition.start();
  };

  const isDark = theme === 'dark';
  const themeStyles = {
    bg: isDark ? '#111113' : '#ffffff',
    text: isDark ? '#f4f4f5' : '#18181b',
    subtext: isDark ? '#a1a1aa' : '#71717a',
    cardBg: isDark ? '#1a1a1d' : '#ffffff',
    border: isDark ? '#27272a' : '#eae7e2',
    dropdownBg: isDark ? '#18181b' : '#ffffff',
    pillBg: isDark ? '#262629' : '#f4f4f5',
    sectionBg: isDark ? '#161619' : '#f7f6f4',
    heroBg: isDark ? '#21201d' : '#e6e2db'
  };

  const t = {
    EN: {
      scooters: "EV-Scooters", accessories: "Accessories", batteries: "Batteries", spareParts: "Spare Parts", partner: "Become a Partner",
      searchPlaceholder: "Search EV, batteries, helmets, parts...", account: "Account",
      highSpeed: "High Speed EV Scooter", slowSpeed: "Slow EV Scooter (Non-RTO)", compare: "Compare Models", testRide: "Book a Test Ride",
      helmets: "Helmets", jackets: "Riding Jackets", gloves: "Riding Gloves", phoneHolders: "Phone Holders"
    },
    HI: {
      scooters: "ईवी-स्कूटर", accessories: "एक्सेसरीज", batteries: "बैटरी", spareParts: "स्पेयर पार्ट्स", partner: "पार्टनर बनें",
      searchPlaceholder: "ईवी, बैटरी, पार्ट्स खोजें...", account: "अकाउंट",
      highSpeed: "हाई-स्पीड ईवी स्कूटर", slowSpeed: "धीमी गति ईवी", compare: "मॉडल तुलना", testRide: "टेस्ट राइड बुक करें",
      helmets: "हेलमेट", jackets: "जैकेट", gloves: "ग्लव्स", phoneHolders: "मोबाइल होल्डर"
    }
  }[lang];

  const openProduct = (prod) => {
    setIsSearchFocused(false);
    setRouter({ page: 'product', product: prod });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCategory = (catName) => {
    setIsSearchFocused(false);
    setRouter({ page: 'category', categoryName: catName });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode) => {
    setAuthModalMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (name) => {
    setIsLoggedIn(true);
    setCurrentUser(name);
  };

  const liveMatches = searchQuery.trim()
    ? MASTER_PRODUCTS.filter(p => {
        const fullText = `${p.name} ${p.brand} ${p.category} ${p.subCategory || ''} ${p.specs} ${p.color || ''} ${p.features || ''} ${p.compatibility || ''}`.toLowerCase();
        return fullText.includes(searchQuery.toLowerCase());
      })
    : [];

  const topSellingScooters = MASTER_PRODUCTS.filter(p => p.category === 'EV-Scooters').slice(0, 4);
  const categorizedScooters = {
    'High-Speed': MASTER_PRODUCTS.filter(p => p.category === 'EV-Scooters' && p.type === 'High-Speed'),
    'Low-Speed': MASTER_PRODUCTS.filter(p => p.category === 'EV-Scooters' && p.type === 'Low-Speed')
  };
  const categorizedAccessories = {
    'Helmets': MASTER_PRODUCTS.filter(p => p.category === 'Accessories' && p.subCategory === 'Helmet'),
    'Jackets': MASTER_PRODUCTS.filter(p => p.category === 'Accessories' && p.subCategory === 'Jacket'),
    'Gloves': MASTER_PRODUCTS.filter(p => p.category === 'Accessories' && p.subCategory === 'Gloves'),
    'Phone Holders': MASTER_PRODUCTS.filter(p => p.category === 'Accessories' && p.subCategory === 'Phone Holder')
  };
  const horizontalBatteries = MASTER_PRODUCTS.filter(p => p.category === 'Batteries');
  const horizontalSpareParts = MASTER_PRODUCTS.filter(p => p.category === 'Spare Parts');

  const rideShorts = [
    { id: 1, title: "0-60 km/h Warp Test: Ather 450X", views: "142K views", duration: "0:42", thumbnail: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80" },
    { id: 2, title: "Bangalore to Nandi Hills on Ola S1 Pro", views: "98K views", duration: "0:58", thumbnail: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=400&q=80" },
    { id: 3, title: "72V Lithium Pack Water Submersion Test", views: "210K views", duration: "0:35", thumbnail: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=400&q=80" },
    { id: 4, title: "College Commute on Non-RTO Hero Eddy", views: "76K views", duration: "0:45", thumbnail: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=400&q=80" }
  ];

  const reviews = [
    { name: "Siddharth Verma", location: "Indiranagar, Bengaluru", scooter: "Ather 450X Owner", text: "Booking via GBGX was seamless. The scooter was home-delivered with permanent RTO registration in 48 hours. Best EV marketplace in India!", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
    { name: "Pooja Deshmukh", location: "Kothrud, Pune", scooter: "Okinawa Lite User", text: "I bought a low-speed scooter for my father without any driving test or license hassle. GBGX even sent an engineer for a free doorstep demo.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" },
    { name: "Vikramjit Singh", location: "Sector 62, Noida", scooter: "72V Pack & Rynox Gear", text: "Upgraded my retrofitted EV with the GBGX 72V 40Ah battery. Getting an honest 110 km real range in extreme North Indian heat. Outstanding quality!", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" }
  ];

  return (
    <>
      {/* ================= INTRO ANIMATION PRELOADER ================= */}
      {loadingIntro && <IntroLoader onComplete={() => setLoadingIntro(false)} />}

      {/* ================= SIGNUP & LOGIN MODAL ================= */}
      <AuthModal 
        isOpen={showAuthModal}
        initialMode={authModalMode}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <div style={{ backgroundColor: themeStyles.bg, color: themeStyles.text, minHeight: '100vh', width: '100%', overflowX: 'hidden', transition: 'background-color 0.25s ease, color 0.25s ease' }}>

        {/* ================= 1. STRUCTURED NAV BAR ================= */}
        <header style={{
          maxWidth: '1380px',
          margin: '0 auto',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          borderBottom: `1px solid ${themeStyles.border}`,
          position: 'relative',
          zIndex: 100
        }}>
          {/* Logo */}
          <div onClick={() => setRouter({ page: 'home' })} style={{ display: 'flex', alignItems: 'center', flexShrink: 0, cursor: 'pointer' }}>
            <img 
              src="/GBGX_logo_black_transparent.png" 
              alt="GBGX Logo" 
              style={{
                height: '24px',
                width: 'auto',
                objectFit: 'contain',
                filter: isDark ? 'invert(1)' : 'none'
              }}
            />
          </div>

          {/* Navigation Dropdown Menus */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '22px', fontSize: '11.5px', fontWeight: '600', position: 'relative' }}>
            <div 
              onMouseEnter={() => setHoveredNav('scooters')}
              onMouseLeave={() => setHoveredNav(null)}
              style={{ position: 'relative', padding: '6px 0', cursor: 'pointer' }}
            >
              <span onClick={() => openCategory('EV-Scooters')} style={{ color: hoveredNav === 'scooters' ? (isDark ? '#fff' : '#000') : themeStyles.text }}>
                {t.scooters}
              </span>
              {hoveredNav === 'scooters' && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  backgroundColor: themeStyles.dropdownBg,
                  borderRadius: '16px',
                  padding: '10px',
                  minWidth: '220px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                  border: `1px solid ${themeStyles.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 100
                }}>
                  {[
                    { name: t.highSpeed, desc: "Up to 120 km/h • RTO registered", act: () => { setEvTab('High-Speed'); openCategory('High-Speed EV'); } },
                    { name: t.slowSpeed, desc: "No License Needed • 25 km/h", act: () => { setEvTab('Low-Speed'); openCategory('Low-Speed EV'); } },
                    { name: t.compare, desc: "Spec-by-spec comparison", act: () => openCategory('EV-Scooters') },
                    { name: t.testRide, desc: "Free doorstep evaluation", act: () => { setRouter({ page: 'home' }); setTimeout(() => document.getElementById('partner-section')?.scrollIntoView({behavior:'smooth'}), 100); } }
                  ].map((item, idx) => (
                    <div key={idx} onClick={item.act} style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      color: themeStyles.text
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? '#2e2e33' : '#f4f4f5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div style={{ fontSize: '12px', fontWeight: '700' }}>{item.name}</div>
                      <div style={{ fontSize: '9.5px', color: themeStyles.subtext }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div 
              onMouseEnter={() => setHoveredNav('accessories')}
              onMouseLeave={() => setHoveredNav(null)}
              style={{ position: 'relative', padding: '6px 0', cursor: 'pointer' }}
            >
              <span onClick={() => openCategory('Accessories')} style={{ color: hoveredNav === 'accessories' ? (isDark ? '#fff' : '#000') : themeStyles.text }}>
                {t.accessories}
              </span>
              {hoveredNav === 'accessories' && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  backgroundColor: themeStyles.dropdownBg,
                  borderRadius: '16px',
                  padding: '8px',
                  minWidth: '180px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                  border: `1px solid ${themeStyles.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  zIndex: 100
                }}>
                  {[
                    { name: t.helmets, tab: "Helmets" },
                    { name: t.jackets, tab: "Jackets" },
                    { name: t.gloves, tab: "Gloves" },
                    { name: t.phoneHolders, tab: "Phone Holders" }
                  ].map((acc, idx) => (
                    <div key={idx} onClick={() => { setAccessoryTab(acc.tab); openCategory('Accessories'); }} style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: themeStyles.text,
                      fontSize: '11.5px',
                      fontWeight: '600'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? '#2e2e33' : '#f4f4f5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {acc.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span onClick={() => openCategory('Batteries')} style={{ color: themeStyles.text, cursor: 'pointer', padding: '6px 0' }}>
              {t.batteries}
            </span>

            <div 
              onMouseEnter={() => setHoveredNav('spare-parts')}
              onMouseLeave={() => setHoveredNav(null)}
              style={{ position: 'relative', padding: '6px 0', cursor: 'pointer' }}
            >
              <span onClick={() => openCategory('Spare Parts')} style={{ color: hoveredNav === 'spare-parts' ? (isDark ? '#fff' : '#000') : themeStyles.text }}>
                {t.spareParts}
              </span>
              {hoveredNav === 'spare-parts' && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  backgroundColor: themeStyles.dropdownBg,
                  borderRadius: '16px',
                  padding: '10px',
                  minWidth: '220px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                  border: `1px solid ${themeStyles.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3px',
                  zIndex: 100
                }}>
                  <div style={{ fontSize: '9px', fontWeight: '800', textTransform: 'uppercase', color: themeStyles.subtext, padding: '4px 10px 6px 10px' }}>
                    Supported OEM Brands
                  </div>
                  {["Ather OEM Spares", "Ola Electric Hardware", "Hero Electric Motors", "Okinawa Genuine Parts", "TVS iQube Certified"].map((brand, idx) => (
                    <div key={idx} onClick={() => openCategory('Spare Parts')} style={{
                      padding: '7px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: themeStyles.text,
                      fontSize: '11px',
                      fontWeight: '600'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? '#2e2e33' : '#f4f4f5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {brand}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* ================= FUNCTIONAL INTERACTIVE SEARCH BAR ================= */}
          <div ref={searchContainerRef} style={{ position: 'relative' }}>
            <div style={{
              backgroundColor: themeStyles.pillBg,
              borderRadius: '9999px',
              padding: '4px 6px 4px 14px',
              display: 'flex',
              alignItems: 'center',
              width: isSearchFocused ? '340px' : '270px',
              border: `1px solid ${isSearchFocused ? '#221d75' : themeStyles.border}`,
              transition: 'width 0.25s ease, border-color 0.2s ease',
              boxShadow: isSearchFocused ? '0 0 0 3px rgba(16, 185, 129, 0.15)' : 'none'
            }}>
              <input 
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    executeSearch();
                  } else if (e.key === 'Escape') {
                    setIsSearchFocused(false);
                  }
                }}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '11px',
                  color: themeStyles.text,
                  flex: 1,
                  background: 'transparent'
                }}
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  title="Clear"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: themeStyles.subtext,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 4px'
                  }}
                >
                  <Icons.Close />
                </button>
              )}

              <button 
                onClick={handleVoiceSearch} 
                title={isListening ? "Listening..." : "Voice Search"}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: isListening ? '#fee2e2' : 'transparent',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  marginRight: '3px'
                }}
              >
                <Icons.Mic listening={isListening} />
              </button>

              <button 
                onClick={() => executeSearch()}
                title="Search"
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: isDark ? '#fff' : '#18181b',
                  color: isDark ? '#18181b' : '#fff',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Icons.Search />
              </button>
            </div>

            {/* Suggestions & History Dropdown */}
            {isSearchFocused && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '380px',
                backgroundColor: themeStyles.cardBg,
                border: `1px solid ${themeStyles.border}`,
                borderRadius: '18px',
                boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                padding: '16px',
                zIndex: 1000,
                backdropFilter: 'blur(10px)'
              }}>
                {searchQuery.trim() ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: themeStyles.subtext, letterSpacing: '0.5px' }}>
                        Matching Products ({liveMatches.length})
                      </span>
                      <span 
                        onClick={() => executeSearch()} 
                        style={{ fontSize: '10px', color: '#dedde6', fontWeight: '700', cursor: 'pointer' }}
                      >
                        View all results →
                      </span>
                    </div>

                    {liveMatches.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
                        {liveMatches.slice(0, 4).map(item => (
                          <div
                            key={item.id}
                            onClick={() => openProduct(item)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              padding: '8px',
                              borderRadius: '12px',
                              cursor: 'pointer',
                              backgroundColor: themeStyles.pillBg,
                              transition: 'background-color 0.15s ease'
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = isDark ? '#2e2e33' : '#e4e4e7'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = themeStyles.pillBg}
                          >
                            <img src={item.img} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '8px' }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: '11px', fontWeight: '800', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.name}
                              </div>
                              <div style={{ fontSize: '9px', color: themeStyles.subtext }}>
                                {item.brand} • {item.category}
                              </div>
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: '900', color: '#442789', flexShrink: 0 }}>
                              ₹{item.price.toLocaleString('en-IN')}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ padding: '20px 10px', textAlign: 'center', color: themeStyles.subtext, fontSize: '11px' }}>
                        No instant matches for "{searchQuery}". Press <strong>Enter</strong> to search all specs.
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {recentSearches.length > 0 && (
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: themeStyles.subtext, letterSpacing: '0.5px' }}>
                            Recent Searches
                          </span>
                          <span 
                            onClick={() => setRecentSearches([])} 
                            style={{ fontSize: '9px', color: '#ef4444', fontWeight: '700', cursor: 'pointer' }}
                          >
                            Clear
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {recentSearches.map((term, i) => (
                            <span
                              key={i}
                              onClick={() => executeSearch(term)}
                              style={{
                                fontSize: '10.5px',
                                backgroundColor: themeStyles.pillBg,
                                color: themeStyles.text,
                                padding: '4px 10px',
                                borderRadius: '9999px',
                                cursor: 'pointer',
                                border: `1px solid ${themeStyles.border}`
                              }}
                            >
                               {term}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: themeStyles.subtext, letterSpacing: '0.5px', marginBottom: '8px' }}>
                         Trending Searches
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {['Ather 450X', 'Ola S1 Pro', '72V Battery', 'DOT Helmet', 'Rynox Jacket', 'Non-RTO'].map((tag, i) => (
                          <span
                            key={i}
                            onClick={() => executeSearch(tag)}
                            style={{
                              fontSize: '10.5px',
                              backgroundColor: themeStyles.pillBg,
                              color: themeStyles.text,
                              padding: '4px 10px',
                              borderRadius: '9999px',
                              cursor: 'pointer',
                              border: `1px solid ${themeStyles.border}`,
                              fontWeight: '600'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={() => setLang(l => l === 'EN' ? 'HI' : 'EN')} 
              style={{ backgroundColor: themeStyles.pillBg, color: themeStyles.text, border: `1px solid ${themeStyles.border}`, height: '32px', padding: '0 10px', borderRadius: '9999px', fontSize: '10.5px', fontWeight: '700', cursor: 'pointer' }}
            >
              {lang === 'EN' ? 'EN | हिन्दी' : 'हिन्दी | EN'}
            </button>

            <button 
              onClick={() => setTheme(th => th === 'light' ? 'dark' : 'light')} 
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              style={{ backgroundColor: themeStyles.pillBg, color: themeStyles.text, border: `1px solid ${themeStyles.border}`, width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              {isDark ? <Icons.Sun /> : <Icons.Moon />}
            </button>

            <span 
              onClick={() => { setRouter({ page: 'home' }); setTimeout(() => document.getElementById('partner-section')?.scrollIntoView({behavior:'smooth'}), 100); }} 
              style={{
                backgroundColor: 'transparent',
                color: themeStyles.text,
                border: `1px solid ${themeStyles.border}`,
                height: '32px',
                padding: '0 12px',
                borderRadius: '9999px',
                fontSize: '10.5px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              {t.partner}
            </span>

            {/* Account / User Menu */}
            <div 
              onMouseEnter={() => setHoveredNav('account')}
              onMouseLeave={() => setHoveredNav(null)}
              style={{ position: 'relative' }}
            >
              <button 
                onClick={() => {
                  if (!isLoggedIn) handleOpenAuth('signin');
                }}
                style={{ backgroundColor: isDark ? '#2e2e33' : '#3f3d38', color: '#fff', border: 'none', height: '34px', padding: '0 14px', borderRadius: '9999px', fontSize: '11px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              >
                <Icons.User />
                <span>{isLoggedIn ? (currentUser || "Rohan (#GBGX)") : t.account}</span>
              </button>

              {hoveredNav === 'account' && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  backgroundColor: themeStyles.dropdownBg,
                  borderRadius: '16px',
                  padding: '10px',
                  minWidth: '210px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                  border: `1px solid ${themeStyles.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 100
                }}>
                  {isLoggedIn ? (
                    <>
                      <div style={{ padding: '8px 12px', borderBottom: `1px solid ${themeStyles.border}` }}>
                        <div style={{ fontSize: '12px', fontWeight: '800' }}>{currentUser || "Rohan Sharma"}</div>
                        <div style={{ fontSize: '10px', color: '#1f1a6f', fontWeight: '700' }}>ID: GBGX-9842</div>
                      </div>
                      <div style={{ padding: '8px 12px', fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Wishlist</span> <span>({wishlistCount})</span>
                      </div>
                      <div style={{ padding: '8px 12px', fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Cart</span> <span>({cartCount})</span>
                      </div>
                      <button onClick={() => { setIsLoggedIn(false); setCurrentUser(null); }} style={{ border: 'none', background: 'none', color: '#ef4444', padding: '8px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleOpenAuth('signin')} style={{ backgroundColor: '#18181b', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>
                        Sign In
                      </button>
                      <button onClick={() => handleOpenAuth('signup')} style={{ backgroundColor: 'transparent', color: themeStyles.text, border: `1px solid ${themeStyles.border}`, padding: '8px', borderRadius: '8px', fontSize: '11px', fontWeight: '600', cursor: 'pointer', marginTop: '4px' }}>
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ================= DYNAMIC VIEW ROUTING ================= */}

        {/* VIEW 0: DEDICATED SEARCH RESULTS PAGE */}
        {router.page === 'search' && (() => {
          const query = (router.searchQuery || '').toLowerCase();
          const searchFilteredList = MASTER_PRODUCTS.filter(p => {
            const matchesQuery = `${p.name} ${p.brand} ${p.category} ${p.subCategory || ''} ${p.specs} ${p.color || ''} ${p.features || ''} ${p.compatibility || ''}`.toLowerCase().includes(query);
            const matchesCategory = searchCategoryFilter === 'All' || p.category === searchCategoryFilter;
            return matchesQuery && matchesCategory;
          });

          return (
            <div style={{ maxWidth: '1380px', margin: '30px auto', padding: '0 20px 60px 20px' }}>
              <button 
                onClick={() => setRouter({ page: 'home' })}
                style={{ background: 'none', border: 'none', color: themeStyles.subtext, fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}
              >
                <Icons.ArrowLeft /> Back to Home
              </button>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
                <div>
                  <h1 style={{ fontSize: '30px', fontWeight: '900', margin: 0 }}>
                    Search Results for <span style={{ color: '#f2f6f5' }}>"{router.searchQuery}"</span>
                  </h1>
                  <p style={{ fontSize: '12px', color: themeStyles.subtext, margin: '6px 0 0 0' }}>
                    Found {searchFilteredList.length} products matching your query across our verified EV catalog.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {['All', 'EV-Scooters', 'Accessories', 'Batteries', 'Spare Parts'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSearchCategoryFilter(cat)}
                    style={{
                      backgroundColor: searchCategoryFilter === cat ? (isDark ? '#fff' : '#18181b') : themeStyles.pillBg,
                      color: searchCategoryFilter === cat ? (isDark ? '#18181b' : '#fff') : themeStyles.text,
                      border: `1px solid ${themeStyles.border}`,
                      borderRadius: '9999px',
                      padding: '6px 14px',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {searchFilteredList.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px' }}>
                  {searchFilteredList.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => openProduct(item)}
                      style={{
                        backgroundColor: themeStyles.cardBg,
                        borderRadius: '20px',
                        padding: '16px',
                        border: `1px solid ${themeStyles.border}`,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <div>
                        <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                          <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div style={{ fontSize: '10px', fontWeight: '800', color: '#1e1b72', marginBottom: '4px' }}>{item.brand} • {item.category}</div>
                        <h3 style={{ fontSize: '13.5px', fontWeight: '800', margin: '0 0 4px 0' }}>{item.name}</h3>
                        <div style={{ fontSize: '10.5px', color: themeStyles.subtext, marginBottom: '14px' }}>{item.specs}</div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${themeStyles.border}`, paddingTop: '10px' }}>
                        <span style={{ fontSize: '16px', fontWeight: '900' }}>₹{item.price.toLocaleString('en-IN')}</span>
                        <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: isDark ? '#fff' : '#18181b', color: isDark ? '#18181b' : '#fff', padding: '6px 14px', borderRadius: '999px' }}>
                          View Details
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: themeStyles.cardBg, borderRadius: '24px', border: `1px solid ${themeStyles.border}` }}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔍</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '6px' }}>No EV products found matching "{router.searchQuery}"</h3>
                  <p style={{ fontSize: '12px', color: themeStyles.subtext, maxWidth: '400px', margin: '0 auto 20px auto' }}>
                    Try checking your spelling or search for popular terms like <strong>Ather</strong>, <strong>72V Battery</strong>, or <strong>Helmets</strong>.
                  </p>
                  <button 
                    onClick={() => openCategory('EV-Scooters')}
                    style={{ backgroundColor: isDark ? '#fff' : '#18181b', color: isDark ? '#18181b' : '#fff', border: 'none', borderRadius: '9999px', padding: '8px 20px', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Browse EV Scooters
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* VIEW 1: CATEGORY LISTING PAGE */}
        {router.page === 'category' && (
          <div style={{ maxWidth: '1380px', margin: '30px auto', padding: '0 20px 60px 20px' }}>
            <button 
              onClick={() => setRouter({ page: 'home' })}
              style={{ background: 'none', border: 'none', color: themeStyles.subtext, fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}
            >
              <Icons.ArrowLeft /> Back to Home
            </button>

            <h1 style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px' }}>
              {router.categoryName}
            </h1>
            <p style={{ fontSize: '12px', color: themeStyles.subtext, marginBottom: '30px' }}>
              Showing verified multi-brand inventory under {router.categoryName} with doorstep delivery & subsidy assistance.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px' }}>
              {MASTER_PRODUCTS
                .filter(p => {
                  if (router.categoryName === 'All') return true;
                  if (router.categoryName === 'High-Speed EV') return p.category === 'EV-Scooters' && p.type === 'High-Speed';
                  if (router.categoryName === 'Low-Speed EV') return p.category === 'EV-Scooters' && p.type === 'Low-Speed';
                  return p.category.toLowerCase().includes(router.categoryName.toLowerCase());
                })
                .map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => openProduct(item)}
                    style={{
                      backgroundColor: themeStyles.cardBg,
                      borderRadius: '20px',
                      padding: '16px',
                      border: `1px solid ${themeStyles.border}`,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div>
                      <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                        <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                      <div style={{ fontSize: '10px', fontWeight: '800', color: '#170d78', marginBottom: '4px' }}>{item.brand}</div>
                      <h3 style={{ fontSize: '13.5px', fontWeight: '800', margin: '0 0 4px 0' }}>{item.name}</h3>
                      <div style={{ fontSize: '10.5px', color: themeStyles.subtext, marginBottom: '14px' }}>{item.specs}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${themeStyles.border}`, paddingTop: '10px' }}>
                      <span style={{ fontSize: '16px', fontWeight: '900' }}>₹{item.price.toLocaleString('en-IN')}</span>
                      <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: isDark ? '#fff' : '#18181b', color: isDark ? '#18181b' : '#fff', padding: '6px 14px', borderRadius: '999px' }}>
                        View Details
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* VIEW 2: PRODUCT DETAIL PAGE (PDP) WITH TEST RIDE RESTRICTED ONLY TO SCOOTERS */}
        {router.page === 'product' && router.product && (() => {
          const prod = router.product;
          
          const getRecommendations = () => {
            const sub = (prod.subCategory || '').toLowerCase();
            let targetCategories = [];

            if (sub === 'scooter') {
              targetCategories = ['helmet', 'jacket', 'gloves', 'phone holder', 'battery'];
            } else if (sub === 'helmet') {
              targetCategories = ['jacket', 'gloves'];
            } else if (sub === 'jacket') {
              targetCategories = ['helmet', 'gloves'];
            } else if (sub === 'gloves') {
              targetCategories = ['helmet', 'phone holder'];
            }

            if (targetCategories.length === 0) return [];

            const bestMatchesPerCategory = [];

            targetCategories.forEach(targetSub => {
              const matchingCandidates = MASTER_PRODUCTS.filter(p => 
                (p.subCategory || '').toLowerCase() === targetSub && p.id !== prod.id
              );

              if (matchingCandidates.length > 0) {
                const scored = matchingCandidates.map(cand => ({
                  product: cand,
                  similarityScore: calculateAttributeCosineSimilarity(prod, cand)
                }));

                scored.sort((a, b) => b.similarityScore - a.similarityScore);

                bestMatchesPerCategory.push({
                  ...scored[0].product,
                  cosineScorePct: Math.min(99, Math.max(78, Math.round(scored[0].similarityScore * 100)))
                });
              }
            });

            return bestMatchesPerCategory;
          };

          const recommendedItems = getRecommendations();
          const sameCategoryItems = MASTER_PRODUCTS.filter(p => p.category === prod.category && p.id !== prod.id);

          // Check whether current item is an EV Scooter
          const isEvScooter = prod.category === 'EV-Scooters' || (prod.subCategory || '').toLowerCase() === 'scooter';

          return (
            <div style={{ maxWidth: '1380px', margin: '30px auto', padding: '0 20px 80px 20px' }}>
              <button 
                onClick={() => setRouter({ page: 'home' })}
                style={{ background: 'none', border: 'none', color: themeStyles.subtext, fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}
              >
                <Icons.ArrowLeft /> Back to Store
              </button>

              <div style={{
                backgroundColor: themeStyles.cardBg,
                borderRadius: '28px',
                padding: '36px',
                border: `1px solid ${themeStyles.border}`,
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr',
                gap: '40px',
                alignItems: 'center',
                marginBottom: '40px'
              }}>
                <div style={{ height: '360px', backgroundColor: isDark ? '#141416' : '#f4f4f5', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                  <img src={prod.img} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                <div>
                  <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', backgroundColor: themeStyles.pillBg, padding: '4px 10px', borderRadius: '6px', color: '#341599' }}>
                    {prod.brand} • {prod.category}
                  </span>
                  <h1 style={{ fontSize: '32px', fontWeight: '900', margin: '12px 0 8px 0' }}>{prod.name}</h1>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}><Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star /></div>
                    <span style={{ fontSize: '13px', fontWeight: '800' }}>{prod.rating || 4.8}</span>
                    <span style={{ fontSize: '11px', color: themeStyles.subtext }}>({prod.reviewsCount || 120} verified customer reviews)</span>
                  </div>

                  <div style={{ fontSize: '28px', fontWeight: '900', marginBottom: '16px' }}>
                    ₹{Number(prod.price).toLocaleString('en-IN')}
                  </div>

                  <p style={{ fontSize: '12.5px', color: themeStyles.subtext, lineHeight: 1.6, margin: '0 0 16px 0' }}>
                    {prod.description}
                  </p>

                  {/* Attribute Tags */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px', fontSize: '11px' }}>
                    {prod.color && (
                      <div style={{ backgroundColor: themeStyles.pillBg, padding: '6px 12px', borderRadius: '8px', border: `1px solid ${themeStyles.border}` }}>
                         <strong>Colour / Finish:</strong> {prod.color}
                      </div>
                    )}
                    {prod.compatibility && (
                      <div style={{ backgroundColor: themeStyles.pillBg, padding: '6px 12px', borderRadius: '8px', border: `1px solid ${themeStyles.border}` }}>
                         <strong>Compatibility:</strong> {prod.compatibility}
                      </div>
                    )}
                    {prod.features && (
                      <div style={{ backgroundColor: themeStyles.pillBg, padding: '6px 12px', borderRadius: '8px', border: `1px solid ${themeStyles.border}` }}>
                         <strong>Key Features:</strong> {prod.features}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button 
                      onClick={() => setCartCount(c => c + 1)}
                      style={{ backgroundColor: isDark ? '#fff' : '#18181b', color: isDark ? '#18181b' : '#fff', border: 'none', borderRadius: '9999px', padding: '12px 28px', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}
                    >
                      Add to Cart
                    </button>

                    {/* ONLY SHOW "BOOK TEST RIDE" FOR EV-SCOOTERS */}
                    {isEvScooter && (
                      <button 
                        onClick={() => alert(`Free doorstep test ride booked for ${prod.name}! Our representative will contact you shortly.`)}
                        style={{ backgroundColor: 'transparent', color: themeStyles.text, border: `1px solid ${themeStyles.border}`, borderRadius: '9999px', padding: '12px 24px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                      >
                        Book Test Ride
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Segmented Reviews Section */}
              <div style={{
                backgroundColor: themeStyles.sectionBg,
                borderRadius: '28px',
                padding: '36px',
                border: `1px solid ${themeStyles.border}`,
                marginBottom: '40px'
              }}>
                <h2 style={{ fontSize: '22px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '24px' }}>
                  Customer Ratings & Segmented Reviews
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px', alignItems: 'center', borderBottom: `1px solid ${themeStyles.border}`, paddingBottom: '30px', marginBottom: '30px' }}>
                  <div style={{ textAlign: 'center', paddingRight: '30px', borderRight: `1px solid ${themeStyles.border}` }}>
                    <div style={{ fontSize: '48px', fontWeight: '900', lineHeight: 1 }}>{prod.rating || 4.8}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', margin: '8px 0' }}><Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star /></div>
                    <div style={{ fontSize: '11px', color: themeStyles.subtext }}>Based on {prod.reviewsCount || 120} reviews</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { label: "Build Quality & Materials", score: "4.9 / 5.0", pct: "96%" },
                      { label: "Range / Protection Efficiency", score: "4.8 / 5.0", pct: "94%" },
                      { label: "Battery Performance & BMS", score: "4.9 / 5.0", pct: "98%" },
                      { label: "Value for Money", score: "4.7 / 5.0", pct: "91%" }
                    ].map((seg, i) => (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>
                          <span>{seg.label}</span>
                          <span>{seg.score}</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', backgroundColor: themeStyles.pillBg, borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: seg.pct, height: '100%', backgroundColor: '#180f8d', borderRadius: '4px' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {reviews.map((rev, idx) => (
                    <div key={idx} style={{ backgroundColor: themeStyles.cardBg, borderRadius: '16px', padding: '16px', border: `1px solid ${themeStyles.border}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '800' }}>{rev.name} ({rev.location})</span>
                        <span style={{ fontSize: '10px', color: '#342e7f', fontWeight: '700' }}>Verified Buyer</span>
                      </div>
                      <div style={{ display: 'flex', gap: '2px', marginBottom: '6px' }}><Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star /></div>
                      <p style={{ fontSize: '11px', color: themeStyles.subtext, margin: 0 }}>"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              {recommendedItems.length > 0 && (
                <div style={{ marginBottom: '50px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                    <div>
                      <h2 style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', margin: 0 }}>
                        Cosine Similarity Recommendations for {prod.name}
                      </h2>
                      <p style={{ fontSize: '11px', color: themeStyles.subtext, margin: '4px 0 0 0' }}>
                        Paired by attribute vectors across <strong>colour matching, technical features, and ecosystem compatibility</strong>.
                      </p>
                    </div>
                    <span style={{ fontSize: '9px', fontWeight: '800', padding: '4px 10px', borderRadius: '6px', backgroundColor: '#ebf0ee00', color: '#304194', border: '1px solid #1b146d55' }}>
                      ML ATTRIBUTE ENGINE ACTIVE
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${recommendedItems.length}, 1fr)`, gap: '16px', marginTop: '16px' }}>
                    {recommendedItems.map(rec => (
                      <div 
                        key={rec.id} 
                        onClick={() => openProduct(rec)}
                        style={{
                          backgroundColor: themeStyles.cardBg,
                          borderRadius: '20px',
                          padding: '16px',
                          border: `1px solid ${themeStyles.border}`,
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          position: 'relative'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '8.5px', fontWeight: '800', color: '#241e64', textTransform: 'uppercase' }}>
                            {rec.subCategory || rec.category}
                          </span>
                          <span style={{ fontSize: '8px', fontWeight: '900', padding: '2px 6px', borderRadius: '4px', backgroundColor: '#14177f', color: '#fff' }}>
                            {rec.cosineScorePct}% Match
                          </span>
                        </div>

                        <div>
                          <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                            <img src={rec.img} alt={rec.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          </div>
                          <h4 style={{ fontSize: '12px', fontWeight: '800', margin: '0 0 4px 0' }}>{rec.name}</h4>
                          <div style={{ fontSize: '9.5px', color: themeStyles.subtext, marginBottom: '6px' }}> {rec.color}</div>
                          <div style={{ fontSize: '9px', color: themeStyles.subtext, marginBottom: '10px' }}>{rec.compatibility}</div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${themeStyles.border}`, paddingTop: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '900' }}>₹{Number(rec.price).toLocaleString('en-IN')}</span>
                          <span style={{ fontSize: '10px', fontWeight: '700', backgroundColor: isDark ? '#fff' : '#18181b', color: isDark ? '#18181b' : '#fff', padding: '4px 10px', borderRadius: '999px' }}>
                            View Gear
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Same Category */}
              {sameCategoryItems.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '16px' }}>
                    More in {prod.category}
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    {sameCategoryItems.slice(0, 4).map(item => (
                      <div 
                        key={item.id} 
                        onClick={() => openProduct(item)}
                        style={{
                          backgroundColor: themeStyles.cardBg,
                          borderRadius: '20px',
                          padding: '16px',
                          border: `1px solid ${themeStyles.border}`,
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                            <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          </div>
                          <h4 style={{ fontSize: '12px', fontWeight: '800', margin: '0 0 2px 0' }}>{item.name}</h4>
                          <div style={{ fontSize: '9.5px', color: themeStyles.subtext, marginBottom: '10px' }}>{item.specs}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${themeStyles.border}`, paddingTop: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '900' }}>₹{Number(item.price).toLocaleString('en-IN')}</span>
                          <span style={{ fontSize: '10px', fontWeight: '700', backgroundColor: isDark ? '#fff' : '#18181b', color: isDark ? '#18181b' : '#fff', padding: '4px 10px', borderRadius: '999px' }}>
                            View
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          );
        })()}

        {/* VIEW 3: HOME PAGE VIEW */}
        {router.page === 'home' && (
          <>
            {/* ================= 2. LUXURY EDITORIAL HERO SECTION (ROAMORA STYLE) ================= */}
            <Reveal direction="scale">
              <div style={{ maxWidth: '1380px', margin: '14px auto 0 auto', padding: '0 20px' }}>
                <div style={{
                  position: 'relative',
                  borderRadius: '32px',
                  overflow: 'hidden',
                  minHeight: '520px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '60px 50px 90px 50px',
                  backgroundImage: isDark
                    ? `linear-gradient(to right, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.7) 45%, rgba(9,9,11,0.3) 100%), url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1800&q=85')`
                    : `linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.65) 45%, rgba(255,255,255,0.15) 100%), url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1800&q=85')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 40%',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                }}>
                  <div style={{ maxWidth: '580px', zIndex: 2 }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '1px',
                      color: isDark ? '#eff3f2' : '#e8eceb',
                      textTransform: 'uppercase',
                      marginBottom: '14px'
                    }}>
                      <span>The Next Era of Mobility</span>
                      <span style={{ fontSize: '13px' }}></span>
                    </div>

                    <h1 style={{
                      fontSize: '56px',
                      fontFamily: 'Georgia, serif',
                      fontWeight: '400',
                      lineHeight: 1.08,
                      letterSpacing: '-1.5px',
                      color: themeStyles.text,
                      margin: '0 0 16px 0'
                    }}>
                      Electrify<br />
                      <span style={{ fontStyle: 'italic', fontWeight: '400' }}>the Horizon</span>
                    </h1>

                    <p style={{
                      fontSize: '12px',
                      lineHeight: 1.7,
                      color: themeStyles.subtext,
                      maxWidth: '420px',
                      margin: '0 0 28px 0'
                    }}>
                      Discover India's most advanced multi-brand electric scooters, swappable Lithium battery networks, and certified rider protection. Unmatched range, zero emissions.
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <button 
                        onClick={() => openCategory('High-Speed EV')}
                        style={{
                          backgroundColor: isDark ? '#ffffff' : '#18181b',
                          color: isDark ? '#18181b' : '#ffffff',
                          border: 'none',
                          height: '42px',
                          padding: '0 24px',
                          borderRadius: '9999px',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                          boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                          transition: 'transform 0.15s ease'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <span>Explore Fleet</span>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: isDark ? '#18181b' : '#ffffff',
                          color: isDark ? '#ffffff' : '#18181b',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px'
                        }}>
                          →
                        </div>
                      </button>

                      <button 
                        onClick={() => openCategory('Low-Speed EV')}
                        style={{
                          backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                          backdropFilter: 'blur(8px)',
                          color: themeStyles.text,
                          border: `1px solid ${themeStyles.border}`,
                          height: '42px',
                          padding: '0 20px',
                          borderRadius: '9999px',
                          fontSize: '11.5px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Non-RTO Commuters
                      </button>
                    </div>
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: '36px',
                    right: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    zIndex: 3
                  }}
                  onClick={() => document.getElementById('ev-catalog')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: themeStyles.subtext }}>
                      Scroll Down
                    </span>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: `1px solid ${themeStyles.border}`,
                      backgroundColor: isDark ? 'rgba(24,24,27,0.7)' : 'rgba(255,255,255,0.8)',
                      backdropFilter: 'blur(6px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: themeStyles.text
                    }}>
                      ↓
                    </div>
                  </div>
                </div>

                {/* Floating "Find My EV" Search Bar Widget */}
                <div style={{
                  position: 'relative',
                  marginTop: '-38px',
                  zIndex: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '0 20px'
                }}>
                  <div style={{
                    backgroundColor: isDark ? '#18181b' : '#ffffff',
                    borderRadius: '9999px',
                    padding: '8px 12px 8px 24px',
                    boxShadow: '0 16px 36px rgba(0,0,0,0.18)',
                    border: `1px solid ${themeStyles.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    maxWidth: '960px',
                    width: '100%',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '16px' }}></span>
                      <div>
                        <div style={{ fontSize: '10.5px', fontWeight: '800', color: themeStyles.text }}>EV Type:</div>
                        <select 
                          value={evTab}
                          onChange={(e) => setEvTab(e.target.value)}
                          style={{ background: 'none', border: 'none', outline: 'none', fontSize: '10px', color: themeStyles.subtext, cursor: 'pointer', padding: 0 }}
                        >
                          <option value="High-Speed" style={{ background: themeStyles.cardBg }}>High Speed (RTO)</option>
                          <option value="Low-Speed" style={{ background: themeStyles.cardBg }}>Slow EV (Non-RTO)</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ width: '1px', height: '30px', backgroundColor: themeStyles.border }} />

                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '16px' }}></span>
                      <div>
                        <div style={{ fontSize: '10.5px', fontWeight: '800', color: themeStyles.text }}>IDC Range</div>
                        <select 
                          value={heroSearchRange}
                          onChange={(e) => setHeroSearchRange(e.target.value)}
                          style={{ background: 'none', border: 'none', outline: 'none', fontSize: '10px', color: themeStyles.subtext, cursor: 'pointer', padding: 0 }}
                        >
                          <option value="All" style={{ background: themeStyles.cardBg }}>All Ranges</option>
                          <option value="120" style={{ background: themeStyles.cardBg }}>120 km - 150 km</option>
                          <option value="195" style={{ background: themeStyles.cardBg }}>195 km - 212 km</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ width: '1px', height: '30px', backgroundColor: themeStyles.border }} />

                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '16px' }}>🇮🇳</span>
                      <div>
                        <div style={{ fontSize: '10.5px', fontWeight: '800', color: themeStyles.text }}>Delivery City</div>
                        <select 
                          value={heroSearchCity}
                          onChange={(e) => setHeroSearchCity(e.target.value)}
                          style={{ background: 'none', border: 'none', outline: 'none', fontSize: '10px', color: themeStyles.subtext, cursor: 'pointer', padding: 0 }}
                        >
                          <option value="All" style={{ background: themeStyles.cardBg }}>All Hubs</option>
                          <option value="Bengaluru" style={{ background: themeStyles.cardBg }}>Bengaluru, KA</option>
                          <option value="Delhi NCR" style={{ background: themeStyles.cardBg }}>Delhi NCR</option>
                          <option value="Guwahati" style={{ background: themeStyles.cardBg }}>Guwahati, AS</option>
                          <option value="Mumbai" style={{ background: themeStyles.cardBg }}>Mumbai, MH</option>
                          <option value="Satara" style={{ background: themeStyles.cardBg }}>Satara, MH</option>
                          <option value="Pune" style={{ background: themeStyles.cardBg }}>Pune, MH</option>
                          <option value="Hyderabad" style={{ background: themeStyles.cardBg }}>Hyderabad, TS</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ width: '1px', height: '30px', backgroundColor: themeStyles.border }} />

                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '16px' }}>🛡️</span>
                      <div>
                        <div style={{ fontSize: '10.5px', fontWeight: '800', color: themeStyles.text }}>Subsidy</div>
                        <div style={{ fontSize: '10px', color: '#f1f6f5', fontWeight: '700' }}>FAME-II Included</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => openCategory('EV-Scooters')}
                      style={{
                        backgroundColor: isDark ? '#ffffff' : '#18181b',
                        color: isDark ? '#18181b' : '#ffffff',
                        border: 'none',
                        borderRadius: '9999px',
                        height: '44px',
                        padding: '0 24px',
                        fontSize: '11px',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                    >
                      <span>Find EV</span>
                      <Icons.Search />
                    </button>
                  </div>
                </div>

                {/* 4-Item Value Proposition Bar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '20px',
                  padding: '40px 20px 20px 20px',
                  maxWidth: '1200px',
                  margin: '0 auto'
                }}>
                  {[
                    { icon: "🛵", title: "Certified Multi-Brand Fleet", desc: "Top models from Ather, Ola, TVS, Chetak, and Simple." },
                    { icon: "🔋", title: "AIS-156 Smart Battery Cells", desc: "Active CAN-BMS thermal protection tested for Indian climate." },
                    { icon: "🏷️", title: "FAME-II Best Price Direct", desc: "Direct government EV subsidies and upfront RTO assistance." },
                    { icon: "🛠️", title: "24/7 Roadside Assistance", desc: "Doorstep test rides, battery swapping, and genuine parts." }
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '12px',
                        backgroundColor: themeStyles.pillBg,
                        border: `1px solid ${themeStyles.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        flexShrink: 0
                      }}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '12px', fontWeight: '800', color: themeStyles.text, marginBottom: '4px' }}>
                          {item.title}
                        </h4>
                        <p style={{ fontSize: '10px', color: themeStyles.subtext, lineHeight: 1.5, margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* ================= 3. TRUSTED PARTNERS ================= */}
            <Reveal direction="up">
              <section style={{ maxWidth: '1380px', margin: '0 auto', padding: '10px 20px 36px 20px', textAlign: 'center' }}>
                <p style={{ 
                  fontSize: '10.5px', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1.4px', 
                  fontWeight: '800', 
                  color: themeStyles.subtext, 
                  marginBottom: '16px' 
                }}>
                  TRUSTED PARTNERS: POWERING INDIA'S TOP EV BRANDS
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                  padding: '16px',
                  backgroundColor: themeStyles.pillBg,
                  borderRadius: '24px',
                  border: `1px solid ${themeStyles.border}`
                }}>
                  {[
                    { name: "ATHER ENERGY", logo: <Icons.AtherLogo />, badge: "High-Speed" },
                    { name: "OLA ELECTRIC", logo: <Icons.OlaLogo />, badge: "MoveOS 4" },
                    { name: "TVS iQUBE", logo: <Icons.TVSLogo />, badge: "Family EV" },
                    { name: "BAJAJ CHETAK", logo: <Icons.ChetakLogo />, badge: "Metal Body" }
                  ].map((partner, i) => (
                    <div 
                      key={i}
                      onClick={() => openCategory('EV-Scooters')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 18px',
                        borderRadius: '9999px',
                        backgroundColor: themeStyles.cardBg,
                        border: `1px solid ${themeStyles.border}`,
                        color: themeStyles.text,
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#f4f4f5' : '#18181b' }}>
                        {partner.logo}
                      </span>
                      <span style={{ fontSize: '11.5px', fontWeight: '900', letterSpacing: '0.6px', whiteSpace: 'nowrap' }}>
                        {partner.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* ================= 4. TOP SELLING ELECTRIC SCOOTERS ================= */}
            <Reveal direction="up">
              <section style={{ maxWidth: '1380px', margin: '0 auto', padding: '10px 20px 50px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.4px', margin: 0 }}>
                      TOP SELLING ELECTRIC SCOOTERS
                    </h2>
                    <p style={{ fontSize: '11px', color: themeStyles.subtext, margin: '2px 0 0 0' }}>India's highest rated and best-selling electric two-wheelers.</p>
                  </div>
                  <span onClick={() => openCategory('EV-Scooters')} style={{ fontSize: '11px', fontWeight: '700', color: themeStyles.subtext, cursor: 'pointer' }}>View all →</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {topSellingScooters.map((item, idx) => (
                    <Reveal key={item.id} delay={idx * 75} direction="up">
                      <div onClick={() => openProduct(item)} style={{ backgroundColor: themeStyles.cardBg, borderRadius: '20px', padding: '16px', border: `1px solid ${themeStyles.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', cursor: 'pointer' }}>
                        <div>
                          <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}><img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
                          <h3 style={{ fontSize: '13px', fontWeight: '800', margin: '0 0 2px 0' }}>{item.name}</h3>
                          <div style={{ fontSize: '10px', color: themeStyles.subtext, marginBottom: '10px' }}>{item.brand}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${themeStyles.border}`, paddingTop: '10px' }}>
                          <div style={{ fontSize: '16px', fontWeight: '900' }}>₹{item.price.toLocaleString('en-IN')}</div>
                          <span style={{ backgroundColor: isDark ? '#ffffff' : '#18181b', color: isDark ? '#18181b' : '#ffffff', borderRadius: '9999px', padding: '6px 12px', fontSize: '10.5px', fontWeight: '700' }}>View</span>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* ================= 6. ACCESSORIES SECTION ================= */}
            <Reveal direction="up">
              <section id="accessories-section" style={{ maxWidth: '1380px', margin: '0 auto', padding: '10px 20px 50px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.4px', margin: 0 }}>RIDER ACCESSORIES & SAFETY GEAR</h2>
                    <p style={{ fontSize: '11px', color: themeStyles.subtext, margin: '2px 0 0 0' }}>Certified motorcycle and EV protection for comfort and security.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {['Helmets', 'Jackets', 'Gloves', 'Phone Holders'].map(tab => (
                      <button key={tab} onClick={() => setAccessoryTab(tab)} style={{ backgroundColor: accessoryTab === tab ? (isDark ? '#fff' : '#18181b') : themeStyles.pillBg, color: accessoryTab === tab ? (isDark ? '#18181b' : '#fff') : themeStyles.text, border: `1px solid ${themeStyles.border}`, borderRadius: '9999px', padding: '6px 14px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>{tab}</button>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {categorizedAccessories[accessoryTab].map((item, idx) => (
                    <Reveal key={item.id} delay={idx * 60} direction="up">
                      <div onClick={() => openProduct(item)} style={{ backgroundColor: themeStyles.cardBg, borderRadius: '20px', padding: '16px', border: `1px solid ${themeStyles.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', cursor: 'pointer' }}>
                        <div>
                          <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', backgroundColor: isDark ? '#141416' : '#f4f4f5', borderRadius: '14px', overflow: 'hidden' }}>
                            <img src={item.img} alt={item.name} onError={(e)=>{e.target.onerror=null; e.target.src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=500&q=80"}} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          </div>
                          <h3 style={{ fontSize: '13px', fontWeight: '800', margin: '0 0 4px 0' }}>{item.name}</h3>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${themeStyles.border}`, paddingTop: '10px' }}>
                          <span style={{ fontSize: '15px', fontWeight: '900' }}>₹{item.price.toLocaleString('en-IN')}</span>
                          <span style={{ backgroundColor: isDark ? '#fff' : '#18181b', color: isDark ? '#18181b' : '#fff', borderRadius: '9999px', padding: '6px 14px', fontSize: '10.5px', fontWeight: '700' }}>View</span>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* ================= 7. SMART LITHIUM-ION BATTERIES ================= */}
            <Reveal direction="up">
              <section id="batteries-section" style={{ maxWidth: '1380px', margin: '0 auto', padding: '10px 20px 50px 20px' }}>
                <div style={{ backgroundColor: themeStyles.sectionBg, borderRadius: '28px', padding: '28px', border: `1px solid ${themeStyles.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '22px' }}>
                    <div>
                      <h2 style={{ fontSize: '22px', fontWeight: '900', textTransform: 'uppercase', margin: 0 }}>SMART LITHIUM-ION BATTERIES</h2>
                      <p style={{ fontSize: '11px', color: themeStyles.subtext, margin: '4px 0 0 0' }}>AIS-156 certified packs with smart Bluetooth CAN BMS.</p>
                    </div>
                    <span onClick={() => openCategory('Batteries')} style={{ fontSize: '11px', fontWeight: '700', color: themeStyles.text, cursor: 'pointer' }}>View All →</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    {horizontalBatteries.map((bat, idx) => (
                      <Reveal key={bat.id} delay={idx * 70} direction="up">
                        <div onClick={() => openProduct(bat)} style={{ backgroundColor: themeStyles.cardBg, borderRadius: '20px', padding: '16px', border: `1px solid ${themeStyles.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', cursor: 'pointer' }}>
                          <div>
                            <div style={{ height: '135px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}><img src={bat.img} alt={bat.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
                            <h3 style={{ fontSize: '13px', fontWeight: '800', margin: '0 0 3px 0' }}>{bat.name}</h3>
                            <div style={{ fontSize: '10px', color: themeStyles.subtext, marginBottom: '6px' }}>{bat.brand}</div>
                          </div>
                          <div style={{ borderTop: `1px solid ${themeStyles.border}`, paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '16px', fontWeight: '900' }}>₹{bat.price.toLocaleString('en-IN')}</span>
                            <span style={{ backgroundColor: isDark ? '#fff' : '#18181b', color: isDark ? '#18181b' : '#fff', borderRadius: '9999px', padding: '4px 12px', fontSize: '10px', fontWeight: '700' }}>View</span>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </section>
            </Reveal>

            {/* ================= 8. OEM SPARE & AUTO PARTS ================= */}
            <Reveal direction="up">
              <section id="spare-parts-section" style={{ maxWidth: '1380px', margin: '0 auto', padding: '10px 20px 50px 20px' }}>
                <div style={{ backgroundColor: themeStyles.sectionBg, borderRadius: '28px', padding: '28px', border: `1px solid ${themeStyles.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '22px' }}>
                    <div>
                      <h2 style={{ fontSize: '22px', fontWeight: '900', textTransform: 'uppercase', margin: 0 }}>OEM SPARE & AUTO PARTS</h2>
                      <p style={{ fontSize: '11px', color: themeStyles.subtext, margin: '4px 0 0 0' }}>Direct factory-replacement BLDC motors, controllers, and calipers.</p>
                    </div>
                    <span onClick={() => openCategory('Spare Parts')} style={{ fontSize: '11px', fontWeight: '700', color: themeStyles.text, cursor: 'pointer' }}>View All →</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    {horizontalSpareParts.map((part, idx) => (
                      <Reveal key={part.id} delay={idx * 70} direction="up">
                        <div onClick={() => openProduct(part)} style={{ backgroundColor: themeStyles.cardBg, borderRadius: '20px', padding: '16px', border: `1px solid ${themeStyles.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', cursor: 'pointer' }}>
                          <div>
                            <div style={{ height: '135px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}><img src={part.img} alt={part.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /></div>
                            <h3 style={{ fontSize: '13px', fontWeight: '800', margin: '0 0 3px 0' }}>{part.name}</h3>
                            <div style={{ fontSize: '10px', color: themeStyles.subtext, marginBottom: '6px' }}>{part.brand}</div>
                          </div>
                          <div style={{ borderTop: `1px solid ${themeStyles.border}`, paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '16px', fontWeight: '900' }}>₹{part.price.toLocaleString('en-IN')}</span>
                            <span style={{ backgroundColor: isDark ? '#fff' : '#18181b', color: isDark ? '#18181b' : '#fff', borderRadius: '9999px', padding: '4px 12px', fontSize: '10px', fontWeight: '700' }}>View</span>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </section>
            </Reveal>

            {/* ================= 12. BECOME A PARTNER ================= */}
            <Reveal direction="up">
              <section id="partner-section" style={{ maxWidth: '1380px', margin: '0 auto', padding: '10px 20px 50px 20px' }}>
                <div style={{ backgroundColor: themeStyles.sectionBg, borderRadius: '28px', padding: '36px', border: `1px solid ${themeStyles.border}`, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '36px' }}>
                  <div>
                    <h2 style={{ fontSize: '28px', fontWeight: '900', margin: '8px 0 12px 0' }}>Become a GBGX Partner</h2>
                    <p style={{ fontSize: '12px', color: themeStyles.subtext, lineHeight: 1.6, margin: '0 0 20px 0' }}>Partner with India's fastest growing multi-brand electric vehicle marketplace.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {['Dealership / Franchise', 'Fleet & B2B Partner', 'Battery Swap Station Partner', 'OEM Parts Supplier'].map(type => (
                        <button key={type} onClick={() => setPartnerType(type)} style={{ backgroundColor: partnerType === type ? (isDark ? '#fff' : '#18181b') : themeStyles.cardBg, color: partnerType === type ? (isDark ? '#18181b' : '#fff') : themeStyles.text, border: `1px solid ${themeStyles.border}`, borderRadius: '12px', padding: '10px 14px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>✓ {type}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ backgroundColor: themeStyles.cardBg, borderRadius: '20px', padding: '24px', border: `1px solid ${themeStyles.border}` }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', margin: '0 0 4px 0' }}>Partnership Request: {partnerType}</h3>
                    {partnerSubmitted ? (
                      <div style={{ padding: '20px', textAlign: 'center', color: '#221b83', fontWeight: '800', fontSize: '13px' }}>Thank you! Your inquiry has been submitted.</div>
                    ) : (
                      <form onSubmit={(e) => { e.preventDefault(); setPartnerSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                        <input type="text" placeholder="Full Name / Business Name" required value={partnerForm.name} onChange={e => setPartnerForm({...partnerForm, name: e.target.value})} style={{ backgroundColor: themeStyles.pillBg, border: `1px solid ${themeStyles.border}`, borderRadius: '8px', padding: '9px 12px', fontSize: '11px', color: themeStyles.text, outline: 'none' }} />
                        <input type="tel" placeholder="Phone Number (+91)" required value={partnerForm.phone} onChange={e => setPartnerForm({...partnerForm, phone: e.target.value})} style={{ backgroundColor: themeStyles.pillBg, border: `1px solid ${themeStyles.border}`, borderRadius: '8px', padding: '9px 12px', fontSize: '11px', color: themeStyles.text, outline: 'none' }} />
                        <input type="text" placeholder="City & State" required value={partnerForm.city} onChange={e => setPartnerForm({...partnerForm, city: e.target.value})} style={{ backgroundColor: themeStyles.pillBg, border: `1px solid ${themeStyles.border}`, borderRadius: '8px', padding: '9px 12px', fontSize: '11px', color: themeStyles.text, outline: 'none' }} />
                        <button type="submit" style={{ backgroundColor: isDark ? '#fff' : '#18181b', color: isDark ? '#18181b' : '#fff', border: 'none', borderRadius: '8px', padding: '11px', fontSize: '11.5px', fontWeight: '800', cursor: 'pointer', marginTop: '6px' }}>Submit Application</button>
                      </form>
                    )}
                  </div>
                </div>
              </section>
            </Reveal>

            {/* ================= 13. EXPLORE ELECTRIC RIDE SHORTS ================= */}
            <Reveal direction="up">
              <section style={{ maxWidth: '1380px', margin: '0 auto', padding: '10px 20px 50px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.4px', margin: 0 }}>EXPLORE ELECTRIC RIDE SHORTS</h2>
                    <p style={{ fontSize: '11px', color: themeStyles.subtext, margin: '2px 0 0 0' }}>Quick EV stories, acceleration bursts, and road tests from the GBGX world.</p>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: themeStyles.subtext, cursor: 'pointer' }}>Watch all reels →</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {rideShorts.map(short => (
                    <div key={short.id} style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '300px', backgroundColor: '#000', cursor: 'pointer' }}>
                      <img src={short.thumbnail} alt={short.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.85)', color: '#18181b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icons.Play />
                      </div>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', color: '#fff' }}>
                        <div style={{ fontSize: '11.5px', fontWeight: '800', lineHeight: 1.3, marginBottom: '2px' }}>{short.title}</div>
                        <div style={{ fontSize: '9px', color: '#d4d4d8', display: 'flex', justifyContent: 'space-between' }}>
                          <span>{short.views}</span><span>{short.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* ================= 14. THOUSANDS OF USERS ARE ALREADY USING GBGX ================= */}
            <Reveal direction="up">
              <section style={{ maxWidth: '1380px', margin: '0 auto', padding: '10px 20px 50px 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '-0.5px', margin: '0 0 6px 0' }}>Thousands of Users Are Already Using GBGX</h2>
                  <p style={{ fontSize: '11px', color: themeStyles.subtext }}>Real stories from verified owners and daily EV commuters across India.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }}>
                  {reviews.map((rev, idx) => (
                    <div key={idx} style={{ backgroundColor: themeStyles.cardBg, borderRadius: '20px', padding: '20px', border: `1px solid ${themeStyles.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <p style={{ fontSize: '11.5px', lineHeight: 1.6, color: themeStyles.subtext, margin: '0 0 16px 0', fontStyle: 'italic' }}>"{rev.text}"</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: `1px solid ${themeStyles.border}`, paddingTop: '12px' }}>
                        <img src={rev.avatar} alt={rev.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: '800' }}>{rev.name}</div>
                          <div style={{ fontSize: '9.5px', color: '#2d1f76', fontWeight: '700' }}>{rev.scooter} • {rev.location}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* ================= COMPLETE ABOUT US SECTION ================= */}
<Reveal>
  <section
    id="about"
    style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '96px 24px',
      borderTop: '1px solid #262626',
      color: '#ffffff',
      fontFamily: 'inherit',
    }}
  >
    {/* 1. Header & Introduction */}
    <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 64px auto' }}>
      <span
        style={{
          fontSize: '12px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#888888',
          fontWeight: 600,
        }}
      >
        Our Journey
      </span>
      <h2
        style={{
          fontSize: '42px',
          fontWeight: 700,
          marginTop: '12px',
          marginBottom: '20px',
          letterSpacing: '-0.5px',
        }}
      >
        EV Excellence, Redefined
      </h2>
      <p style={{ color: '#a3a3a3', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
        GBG X was born from a singular vision—to transform how India experiences premium electric mobility.
        What started as a passion project has evolved into the nation's most trusted destination for top-rated electric vehicles.
      </p>
      <p style={{ color: '#a3a3a3', fontSize: '16px', lineHeight: 1.8 }}>
        We don't just sell scooters; we curate eco-friendly travel experiences. Every vehicle in our multi-brand EV inventory 
        is handpicked, rigorously inspected, and presented with a level of transparency that sets new automotive retail standards.
      </p>
    </div>

    {/* Key Highlights Banner */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '64px',
      }}
    >
      <div style={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
        <h4 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 6px 0', color: '#ffffff' }}>Premium Selection</h4>
        <p style={{ color: '#888888', fontSize: '14px', margin: 0 }}>Handpicked EVs</p>
      </div>
      <div style={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
        <h4 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 6px 0', color: '#ffffff' }}>Verified Quality</h4>
        <p style={{ color: '#888888', fontSize: '14px', margin: 0 }}>100% Inspected</p>
      </div>
      <div style={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
        <h4 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 6px 0', color: '#ffffff' }}>Seamless Process</h4>
        <p style={{ color: '#888888', fontSize: '14px', margin: 0 }}>Hassle Free</p>
      </div>
      <div style={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
        <h4 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 6px 0', color: '#ffffff' }}>Trusted Experience</h4>
        <p style={{ color: '#888888', fontSize: '14px', margin: 0 }}>Active Since 2023</p>
      </div>
    </div>

    {/* 2. Leadership Message */}
    <div
      style={{
        backgroundColor: '#141414',
        border: '1px solid #262626',
        borderRadius: '20px',
        padding: '48px 36px',
        marginBottom: '80px',
        position: 'relative',
      }}
    >
      <span style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888888', fontWeight: 600 }}>
        Leadership Message
      </span>
      <p style={{ fontSize: '18px', lineHeight: 1.8, fontStyle: 'italic', color: '#e5e5e5', margin: '24px 0' }}>
        "At GBG X, we don't just sell Scooters – we fulfill dreams. Every vehicle that leaves our showroom carries with it a promise:
        a promise of quality, transparency, and a relationship that lasts well beyond the purchase. Our journey has been incredible,
        but what excites me most is what lies ahead. Together, we're not just driving scooters; we're driving India's automotive future."
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>Akash Ali</span>
        <span style={{ fontSize: '14px', color: '#a3a3a3' }}>Founder &amp; CEO, GBG X (GoBabyGo Private Limited)</span>
        <span style={{ fontSize: '12px', color: '#666666' }}>Visionary Leader Since 2019</span>
      </div>
    </div>

    {/* ================= THE LEGACY OF GBGX: TIMELINE INFOGRAPHIC ================= */}
<div
  style={{
    width: '100%',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '80px 20px',
    color: '#ffffff',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
    boxSizing: 'border-box',
  }}
>
  {/* Section Header */}
  <div style={{ textAlign: 'center', marginBottom: '80px' }}>
    <span
      style={{
        fontSize: '12px',
        letterSpacing: '4px',
        textTransform: 'uppercase',
        color: '#9ca3af',
        fontWeight: 600,
        display: 'block',
        marginBottom: '10px',
      }}
    >
      Timeline Infographic
    </span>
    <h3
      style={{
        fontSize: '36px',
        fontWeight: 800,
        letterSpacing: '-0.5px',
        margin: '0 0 10px 0',
        textTransform: 'uppercase',
      }}
    >
      The Legacy of GBGX
    </h3>
    <p
      style={{
        fontSize: '15px',
        color: '#6b7280',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        margin: 0,
      }}
    >
      From 2023 to Future
    </p>

    {/* Top Node Anchor */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '36px',
      }}
    >
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#4b5563',
          boxShadow: '0 0 0 4px rgba(75, 85, 99, 0.25)',
        }}
      />
    </div>
  </div>

  {/* Timeline Container */}
  <div style={{ position: 'relative', width: '100%', padding: '20px 0' }}>
    {/* Continuous Vertical Axis Spine */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: '2px',
        backgroundColor: '#27272a',
        transform: 'translateX(-50%)',
        zIndex: 1,
      }}
    />

    {/* ================= ITEM 01: 2023 - THE BEGINNING ================= */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '90px',
        zIndex: 2,
      }}
    >
      {/* Left Counter-Element: Stylized Script Accent */}
      <div
        style={{
          flex: '1',
          textAlign: 'right',
          paddingRight: '60px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'cursive, "Brush Script MT", "Segoe Script", sans-serif',
            fontSize: '32px',
            color: '#a78bfa',
            opacity: 0.85,
            letterSpacing: '1px',
            transform: 'rotate(-4deg)',
          }}
        >
          Genesis
        </span>
      </div>

      {/* Central Number Node */}
      <div
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          backgroundColor: '#1e1b4b',
          border: '3px solid #312e81',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: '20px',
          fontWeight: 700,
          flexShrink: 0,
          boxShadow: '0 0 24px rgba(49, 46, 129, 0.45)',
          zIndex: 3,
        }}
      >
        01
      </div>

      {/* Right Content Block */}
      <div
        style={{
          flex: '1',
          paddingLeft: '60px',
          position: 'relative',
          textAlign: 'left',
        }}
      >
        {/* Horizontal Connector Arm */}
        <div
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#6366f1' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#6366f1' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#6366f1' }} />
          <div style={{ width: '22px', height: '1.5px', backgroundColor: '#374151' }} />
        </div>

        <div style={{ maxWidth: '340px' }}>
          <div style={{ display: 'inline-block', color: '#818cf8', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', marginBottom: '4px' }}>
            2023 • THE BEGINNING
          </div>
          <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            One-Stop EV Platform
          </h4>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#9ca3af', margin: 0 }}>
            GBGX launched with a vision to create a comprehensive platform for electric scooters, prioritizing accessibility, rigorous reliability standards, and variety.
          </p>
        </div>
      </div>
    </div>

    {/* ================= ITEM 02: 2023 - BUILDING ECOSYSTEM ================= */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '90px',
        zIndex: 2,
      }}
    >
      {/* Left Content Block */}
      <div
        style={{
          flex: '1',
          paddingRight: '60px',
          position: 'relative',
          textAlign: 'right',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {/* Horizontal Connector Arm */}
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexDirection: 'row-reverse',
          }}
        >
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#818cf8' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#818cf8' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#818cf8' }} />
          <div style={{ width: '22px', height: '1.5px', backgroundColor: '#374151' }} />
        </div>

        <div style={{ maxWidth: '340px' }}>
          <div style={{ display: 'inline-block', color: '#a78bfa', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', marginBottom: '4px' }}>
            2023 • EXPANSION
          </div>
          <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Complete EV Solutions
          </h4>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#9ca3af', margin: 0 }}>
            Expanded beyond two-wheelers to integrate complete ecosystem support: genuine OEM spare parts, advanced batteries, tires, regenerative brakes, and rider gear.
          </p>
        </div>
      </div>

      {/* Central Number Node */}
      <div
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          backgroundColor: '#312e81',
          border: '3px solid #4338ca',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: '20px',
          fontWeight: 700,
          flexShrink: 0,
          boxShadow: '0 0 24px rgba(67, 56, 202, 0.45)',
          zIndex: 3,
        }}
      >
        02
      </div>

      {/* Right Counter-Element: Minimalist SVG Blueprint Diagram */}
      <div
        style={{
          flex: '1',
          paddingLeft: '60px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <svg width="110" height="50" viewBox="0 0 110 50" fill="none" opacity="0.6">
          <circle cx="25" cy="25" r="18" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="85" cy="25" r="18" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M43 25H67" stroke="#818cf8" strokeWidth="1.5" />
          <circle cx="55" cy="25" r="4" fill="#a78bfa" />
        </svg>
      </div>
    </div>

    {/* ================= ITEM 03: 2024 - NATIONWIDE REACH ================= */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '90px',
        zIndex: 2,
      }}
    >
      {/* Left Counter-Element: Wireframe Network Motif */}
      <div
        style={{
          flex: '1',
          textAlign: 'right',
          paddingRight: '60px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <svg width="110" height="50" viewBox="0 0 110 50" fill="none" opacity="0.6">
          <circle cx="15" cy="15" r="5" fill="#6366f1" />
          <circle cx="95" cy="35" r="5" fill="#818cf8" />
          <circle cx="55" cy="25" r="7" stroke="#a78bfa" strokeWidth="1.5" />
          <path d="M20 17L50 23M60 27L90 33" stroke="#4b5563" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Central Number Node */}
      <div
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          backgroundColor: '#4338ca',
          border: '3px solid #6366f1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: '20px',
          fontWeight: 700,
          flexShrink: 0,
          boxShadow: '0 0 24px rgba(99, 102, 241, 0.45)',
          zIndex: 3,
        }}
      >
        03
      </div>

      {/* Right Content Block */}
      <div
        style={{
          flex: '1',
          paddingLeft: '60px',
          position: 'relative',
          textAlign: 'left',
        }}
      >
        {/* Horizontal Connector Arm */}
        <div
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#6366f1' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#6366f1' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#6366f1' }} />
          <div style={{ width: '22px', height: '1.5px', backgroundColor: '#374151' }} />
        </div>

        <div style={{ maxWidth: '340px' }}>
          <div style={{ display: 'inline-block', color: '#818cf8', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', marginBottom: '4px' }}>
            2024 • SCALE
          </div>
          <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Pan India Presence
          </h4>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#9ca3af', margin: 0 }}>
            Serving urban commuters and commercial fleets across India with verified catalog specs, seamless digital comparisons, and streamlined procurement.
          </p>
        </div>
      </div>
    </div>

    {/* ================= ITEM 04: 2024 - RIDER COMMUNITY ================= */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '90px',
        zIndex: 2,
      }}
    >
      {/* Left Content Block */}
      <div
        style={{
          flex: '1',
          paddingRight: '60px',
          position: 'relative',
          textAlign: 'right',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {/* Horizontal Connector Arm */}
        <div
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            flexDirection: 'row-reverse',
          }}
        >
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#818cf8' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#818cf8' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#818cf8' }} />
          <div style={{ width: '22px', height: '1.5px', backgroundColor: '#374151' }} />
        </div>

        <div style={{ maxWidth: '340px' }}>
          <div style={{ display: 'inline-block', color: '#a78bfa', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', marginBottom: '4px' }}>
            2024 • COMMUNITY
          </div>
          <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Trust &amp; Convenience
          </h4>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#9ca3af', margin: 0 }}>
            Cultivated a loyal nationwide collective of riders backed by full after-sales assistance, authentic customer reviews, and dedicated sustainable mobility clubs.
          </p>
        </div>
      </div>

      {/* Central Number Node */}
      <div
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          backgroundColor: '#581c87',
          border: '3px solid #7e22ce',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: '20px',
          fontWeight: 700,
          flexShrink: 0,
          boxShadow: '0 0 24px rgba(126, 34, 206, 0.45)',
          zIndex: 3,
        }}
      >
        04
      </div>

      {/* Right Counter-Element: Minimal Stamp / Badge */}
      <div
        style={{
          flex: '1',
          paddingLeft: '60px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            border: '1.5px dashed #4b5563',
            borderRadius: '50%',
            width: '54px',
            height: '54px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            color: '#9ca3af',
            textTransform: 'uppercase',
            fontWeight: 700,
            letterSpacing: '1px',
            transform: 'rotate(12deg)',
          }}
        >
          Verified
        </div>
      </div>
    </div>

    {/* ================= ITEM 05: 2025 & BEYOND - FUTURE READY ================= */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '40px',
        zIndex: 2,
      }}
    >
      {/* Left Counter-Element: Infinity Horizon Vector */}
      <div
        style={{
          flex: '1',
          textAlign: 'right',
          paddingRight: '60px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: '34px',
            fontWeight: 300,
            color: '#c084fc',
            letterSpacing: '2px',
            textShadow: '0 0 16px rgba(192, 132, 252, 0.6)',
          }}
        >
          ∞
        </span>
      </div>

      {/* Central Number Node */}
      <div
        style={{
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          backgroundColor: '#6b21a8',
          border: '3px solid #a855f7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: '20px',
          fontWeight: 700,
          flexShrink: 0,
          boxShadow: '0 0 28px rgba(168, 85, 247, 0.65)',
          zIndex: 3,
        }}
      >
        05
      </div>

      {/* Right Content Block */}
      <div
        style={{
          flex: '1',
          paddingLeft: '60px',
          position: 'relative',
          textAlign: 'left',
        }}
      >
        {/* Horizontal Connector Arm */}
        <div
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#c084fc' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#c084fc' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#c084fc' }} />
          <div style={{ width: '22px', height: '1.5px', backgroundColor: '#374151' }} />
        </div>

        <div style={{ maxWidth: '340px' }}>
          <div style={{ display: 'inline-block', color: '#c084fc', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', marginBottom: '4px' }}>
            2025 &amp; BEYOND • HORIZON
          </div>
          <h4 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Innovation Focused
          </h4>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#9ca3af', margin: 0 }}>
            Pioneering AI-driven vehicle recommendation engines, smart IoT telemetry for battery health, and high-density regional charging infrastructures.
          </p>
        </div>
      </div>
    </div>

    {/* Bottom Terminal Node */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 3,
      }}
    >
      <div
        style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: '#a855f7',
          boxShadow: '0 0 12px #a855f7',
        }}
      />
    </div>
  </div>

  {/* Terminal Stats Summary Footer (Similar to the Bottom Legend Area) */}
  <div
    style={{
      marginTop: '60px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '16px',
      borderTop: '1px solid #1f2937',
      paddingTop: '40px',
      textAlign: 'center',
    }}
  >
    <div>
      <div style={{ fontSize: '28px', fontWeight: 800, color: '#f3f4f6' }}>2023</div>
      <div style={{ fontSize: '12px', color: '#6b7280', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '4px' }}>Year Founded</div>
    </div>
    <div>
      <div style={{ fontSize: '28px', fontWeight: 800, color: '#818cf8' }}>5+</div>
      <div style={{ fontSize: '12px', color: '#6b7280', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '4px' }}>Core Milestones</div>
    </div>
    <div>
      <div style={{ fontSize: '28px', fontWeight: 800, color: '#c084fc' }}>∞</div>
      <div style={{ fontSize: '12px', color: '#6b7280', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '4px' }}>Future Ahead</div>
    </div>
  </div>
</div>

    {/* 4. Who We Are: Vision, Mission & Values */}
    <div style={{ marginBottom: '80px' }}>
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}>
        <span style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888888', fontWeight: 600 }}>
          Who We Are
        </span>
        <h3 style={{ fontSize: '32px', fontWeight: 700, marginTop: '8px', marginBottom: '12px' }}>
          Shaping the Future of Mobility
        </h3>
        <p style={{ color: '#a3a3a3', fontSize: '15px' }}>
          Every decision we make is guided by our commitment to transform the automotive retail landscape in India.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '16px', padding: '36px' }}>
          <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#ffffff' }}>Our Vision</h4>
          <p style={{ color: '#a3a3a3', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
            To become India’s most loved automotive ecosystem—where every buyer finds their perfect electric vehicle match through technology, trust, and transparency.
          </p>
        </div>

        <div style={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '16px', padding: '36px' }}>
          <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#ffffff' }}>Our Mission</h4>
          <p style={{ color: '#a3a3a3', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
            To democratize premium EV ownership by offering unmatched selection, fair EV pricing, and exceptional customer experience across every touchpoint.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <h4 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888888', textAlign: 'center', marginBottom: '24px' }}>
        Our Core Values
      </h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '14px', padding: '24px' }}>
          <h5 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: '0 0 8px 0' }}>Trust First</h5>
          <p style={{ color: '#888888', fontSize: '14px', margin: 0 }}>Every promise delivered</p>
        </div>
        <div style={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '14px', padding: '24px' }}>
          <h5 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: '0 0 8px 0' }}>Innovation</h5>
          <p style={{ color: '#888888', fontSize: '14px', margin: 0 }}>Tech-driven smart mobility solutions</p>
        </div>
        <div style={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '14px', padding: '24px' }}>
          <h5 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: '0 0 8px 0' }}>Customer Focus</h5>
          <p style={{ color: '#888888', fontSize: '14px', margin: 0 }}>Your satisfaction, our priority</p>
        </div>
        <div style={{ backgroundColor: '#141414', border: '1px solid #262626', borderRadius: '14px', padding: '24px' }}>
          <h5 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: '0 0 8px 0' }}>Transparency</h5>
          <p style={{ color: '#888888', fontSize: '14px', margin: 0 }}>No hidden costs, ever—only honest on-road prices</p>
        </div>
      </div>
    </div>

    {/* 5. Multi-Brand Philosophy & Partners */}
    <div
      style={{
        backgroundColor: '#141414',
        border: '1px solid #262626',
        borderRadius: '20px',
        padding: '48px 36px',
      }}
    >
      <div style={{ maxWidth: '800px', marginBottom: '36px' }}>
        <span style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888888', fontWeight: 600 }}>
          Multi-Brand Philosophy
        </span>
        <h3 style={{ fontSize: '32px', fontWeight: 700, marginTop: '8px', marginBottom: '14px' }}>
          One Destination, Infinite Choices
        </h3>
        <p style={{ color: '#a3a3a3', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
          We believe every buyer deserves the freedom to explore the best electric mobility solutions. 
          That's why GBG X partners with 10+ leading EV brands, bringing you an unparalleled selection of electric scooters under one roof—or one click.
        </p>
      </div>

      {/* Feature Bullet Points */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d4d4d4', fontSize: '14px' }}>
          <span style={{ color: '#22c55e' }}>✓</span> Compare across brands in one place
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d4d4d4', fontSize: '14px' }}>
          <span style={{ color: '#22c55e' }}>✓</span> Unbiased expert recommendations
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d4d4d4', fontSize: '14px' }}>
          <span style={{ color: '#22c55e' }}>✓</span> Best price guarantee
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d4d4d4', fontSize: '14px' }}>
          <span style={{ color: '#22c55e' }}>✓</span> Seamless trade-in options
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d4d4d4', fontSize: '14px' }}>
          <span style={{ color: '#22c55e' }}>✓</span> Complete after-sales support
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#d4d4d4', fontSize: '14px' }}>
          <span style={{ color: '#22c55e' }}>✓</span> Certified quality assurance
        </div>
      </div>

      {/* Trusted Partner Brand Badges */}
      <div style={{ borderTop: '1px solid #262626', paddingTop: '32px' }}>
        <h4 style={{ fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#888888', marginBottom: '20px' }}>
          Trusted Partners
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}>
          {['E-Sprinto', 'GBG EV', 'YoBykes', 'Goeen', 'Bgauss', 'Zelio', 'Gravton'].map((brand) => (
            <span
              key={brand}
              style={{
                backgroundColor: '#1e1e1e',
                border: '1px solid #333333',
                borderRadius: '8px',
                padding: '8px 18px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#e5e5e5',
              }}
            >
              {brand}
            </span>
          ))}
        </div>

        {/* Counter Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: '#1c1c1c', borderRadius: '12px', padding: '20px', border: '1px solid #2e2e2e' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff' }}>10+</div>
            <div style={{ fontSize: '13px', color: '#888888', marginTop: '4px' }}>Premium Brands Under One Roof</div>
          </div>
          <div style={{ backgroundColor: '#1c1c1c', borderRadius: '12px', padding: '20px', border: '1px solid #2e2e2e' }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff' }}>500+</div>
            <div style={{ fontSize: '13px', color: '#888888', marginTop: '4px' }}>EV Scooters Ready for Delivery</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</Reveal>

{/* ================= BLOG SECTION ================= */}
<Reveal>
  <section
    id="blog"
    style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '96px 24px',
      borderTop: '1px solid #262626',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}
  >
    {/* Section Header */}
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '56px',
      }}
    >
      <div>
        <span
          style={{
            fontSize: '12px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#a78bfa',
            fontWeight: 700,
            display: 'block',
            marginBottom: '8px',
          }}
        >
          Insights &amp; Updates
        </span>
        <h2
          style={{
            fontSize: '38px',
            fontWeight: 800,
            marginTop: '0',
            marginBottom: '8px',
            letterSpacing: '-0.5px',
            textTransform: 'uppercase',
          }}
        >
          From the Journal
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '15px', margin: 0 }}>
          Engineering notes, architectural breakthroughs, and electric vehicle trends across India.
        </p>
      </div>

      <a
        href="#all-articles"
        style={{
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: 600,
          textDecoration: 'none',
          padding: '10px 20px',
          border: '1px solid #3f3f46',
          borderRadius: '8px',
          backgroundColor: '#18181b',
          transition: 'all 0.2s ease',
        }}
      >
        View All Articles →
      </a>
    </div>

    {/* Articles Grid - Structured like the reference layout */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px',
      }}
    >
      {/* Blog Card 1 */}
      <article
        style={{
          backgroundColor: '#141414',
          border: '1px solid #262626',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'border-color 0.2s ease',
        }}
      >
        <div
          style={{
            height: '210px',
            backgroundColor: '#1e1b4b',
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.25) 0%, transparent 60%)',
            borderBottom: '1px solid #262626',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '20px',
          }}
        >
          <span
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '11px',
              color: '#818cf8',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Engineering
          </span>
        </div>
        <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px', fontWeight: 500 }}>
            September 10, 2026 • 6 min read
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', lineHeight: 1.4, color: '#f3f4f6' }}>
            Next-Gen Battery Architecture: Maximizing Range in Indian Urban Climates
          </h3>
          <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6, flex: 1, margin: '0 0 24px 0' }}>
            An inside look at our advanced thermal management systems and the engineering decisions improving battery longevity across intense urban conditions.
          </p>
          <a
            href="#read-more"
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#a78bfa',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Read Article <span>→</span>
          </a>
        </div>
      </article>

      {/* Blog Card 2 */}
      <article
        style={{
          backgroundColor: '#141414',
          border: '1px solid #262626',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'border-color 0.2s ease',
        }}
      >
        <div
          style={{
            height: '210px',
            backgroundColor: '#312e81',
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.25) 0%, transparent 60%)',
            borderBottom: '1px solid #262626',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '20px',
          }}
        >
          <span
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '11px',
              color: '#c084fc',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Sustainability
          </span>
        </div>
        <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px', fontWeight: 500 }}>
            August 24, 2026 • 4 min read
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', lineHeight: 1.4, color: '#f3f4f6' }}>
            Circular EV Ecosystems: Zero Waste Supply Chains at GBG X
          </h3>
          <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6, flex: 1, margin: '0 0 24px 0' }}>
            Exploring how closed-loop battery recycling programs and eco-friendly packaging components are shaping a genuinely green automotive retail marketplace.
          </p>
          <a
            href="#read-more"
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#a78bfa',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Read Article <span>→</span>
          </a>
        </div>
      </article>

      {/* Blog Card 3 */}
      <article
        style={{
          backgroundColor: '#141414',
          border: '1px solid #262626',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'border-color 0.2s ease',
        }}
      >
        <div
          style={{
            height: '210px',
            backgroundColor: '#1e1b4b',
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
            borderBottom: '1px solid #262626',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '20px',
          }}
        >
          <span
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '11px',
              color: '#60a5fa',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Community
          </span>
        </div>
        <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px', fontWeight: 500 }}>
            July 18, 2026 • 5 min read
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', lineHeight: 1.4, color: '#f3f4f6' }}>
            The Rise of Multi-Brand EV Adoption: What Indian Riders Want
          </h3>
          <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6, flex: 1, margin: '0 0 24px 0' }}>
            Insights gathered from over 45,000 active GBG X members regarding feature preferences, charging accessibility, and multi-brand comparison habits.
          </p>
          <a
            href="#read-more"
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#a78bfa',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Read Article <span>→</span>
          </a>
        </div>
      </article>
    </div>
  </section>
</Reveal>

            {/* ================= 15. STAY CONNECTED WITH GBGX ================= */}
            <Reveal direction="scale">
              <section style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 20px 50px 20px' }}>
                <div style={{ backgroundColor: isDark ? '#1f1e1b' : '#3f3d38', borderRadius: '24px', padding: '36px 44px', color: '#ffffff', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '30px', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '9px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#d4d4d8' }}>STAY CONNECTED WITH GBGX</span>
                    <h2 style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '-0.6px', margin: '6px 0 10px 0' }}>Subscribe to Receive Exclusive EV Updates</h2>
                    <p style={{ fontSize: '11px', color: '#d4d4d8', margin: 0, lineHeight: 1.5 }}>Be the first to know about new EV launches, festive subsidy offers, riding apparel drops, brand partnerships, and exclusive member discounts.</p>
                  </div>
                  <div>
                    {subscribedMsg ? (
                      <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '12px 18px', borderRadius: '9999px', textAlign: 'center', fontSize: '12px', fontWeight: '700' }}>🎉 You are subscribed! Watch your inbox for premier EV updates.</div>
                    ) : (
                      <form onSubmit={(e) => { e.preventDefault(); setSubscribedMsg(true); }} style={{ display: 'flex', backgroundColor: '#ffffff', borderRadius: '9999px', padding: '4px 6px' }}>
                        <input type="email" required placeholder="Enter your email address..." value={subscribeEmail} onChange={e => setSubscribeEmail(e.target.value)} style={{ border: 'none', outline: 'none', padding: '8px 16px', fontSize: '11.5px', color: '#18181b', flex: 1, background: 'transparent' }} />
                        <button type="submit" style={{ backgroundColor: '#18181b', color: '#ffffff', border: 'none', borderRadius: '9999px', padding: '8px 20px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Subscribe</button>
                      </form>
                    )}
                  </div>
                </div>
              </section>
            </Reveal>
          </>
        )}

        {/* ================= 16. FOOTER ================= */}
        <footer style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 20px 30px 20px', borderTop: `1px solid ${themeStyles.border}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1.3fr', gap: '24px', padding: '36px 0', borderBottom: `1px solid ${themeStyles.border}` }}>
            <div>
              <div onClick={() => setRouter({ page: 'home' })} style={{ marginBottom: '14px', cursor: 'pointer' }}>
                <img src="/GBGX_logo_black_transparent.png" alt="GBGX Logo" style={{ height: '22px', width: 'auto', objectFit: 'contain', filter: isDark ? 'invert(1)' : 'none' }} />
              </div>
              <p style={{ fontSize: '10.5px', color: themeStyles.subtext, lineHeight: 1.6, maxWidth: '240px', marginBottom: '16px' }}>India's premier multi-brand electric vehicle marketplace. High-speed scooters, non-RTO city models, smart Lithium-ion batteries, riding apparel, and certified OEM spare parts.</p>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {[
                  { name: 'Instagram', icon: <Icons.Instagram />, url: 'https://instagram.com' },
                  { name: 'Facebook', icon: <Icons.Facebook />, url: 'https://facebook.com' },
                  { name: 'YouTube', icon: <Icons.YouTube />, url: 'https://youtube.com' },
                  { name: 'LinkedIn', icon: <Icons.LinkedIn />, url: 'https://linkedin.com' },
                  { name: 'X', icon: <Icons.TwitterX />, url: 'https://x.com' }
                ].map((social, i) => (
                  <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" title={social.name} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: themeStyles.pillBg, border: `1px solid ${themeStyles.border}`, color: themeStyles.text, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '12px' }}>EV Catalog</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', fontSize: '10.5px', color: themeStyles.subtext }}>
                <span onClick={() => openCategory('High-Speed EV')} style={{ cursor: 'pointer' }}>High-Speed EV Scooters</span>
                <span onClick={() => openCategory('Low-Speed EV')} style={{ cursor: 'pointer' }}>Slow EV Scooters (Non-RTO)</span>
                <span onClick={() => openCategory('Batteries')} style={{ cursor: 'pointer' }}>72V & 60V Lithium Packs</span>
                <span onClick={() => openCategory('Accessories')} style={{ cursor: 'pointer' }}>ISI / DOT Certified Helmets</span>
                <span onClick={() => openCategory('Accessories')} style={{ cursor: 'pointer' }}>Riding Jackets & Gloves</span>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '12px' }}>Partner & Fleet</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', fontSize: '10.5px', color: themeStyles.subtext }}>
                <span>Become an EV Dealer</span>
                <span>B2B Commercial Fleet Supply</span>
                <span>Battery Swap Network</span>
                <span>OEM Spares Distribution</span>
                <span>Investor Relations</span>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '12px' }}>Customer Care</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', fontSize: '10.5px', color: themeStyles.subtext }}>
                <span>Doorstep Test Ride</span>
                <span>RTO Registration & FAME-II</span>
                <span>Roadside Assistance (RSA)</span>
                <span>Battery Health Warranty</span>
                <span>Privacy & Terms</span>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '12px' }}>Corporate Headquarters</h4>
              <div style={{ fontSize: '12px', fontWeight: '900', color: themeStyles.text, marginBottom: '6px' }}><a href="tel:+918800023537" style={{ color: '#ffffff', textDecoration: 'none' }}
  className="hover:text-gray-300">☎ +91 88000 23537</a></div>
              <div style={{ fontSize: '11px', color: themeStyles.subtext, marginBottom: '6px' }}> <a href="mailto:support@gbgx.com" style={{ color: '#ffffff', textDecoration: 'none' }}
  className="hover:text-gray-300">✉️ support@gbgx.com</a></div>
              <div style={{ fontSize: '10.5px', color: themeStyles.subtext, lineHeight: 1.5, marginBottom: '8px' }}> 🏠︎ Tower - B, The Corenthum, Noida Sector 62, Uttar Pradesh - 201301, India</div>
              <div style={{ fontSize: '9px', color: themeStyles.subtext }}>Hours: Mon - Sat: 10:00 - 07:00 IST</div>
            </div>
          </div>
          <div style={{ paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9.5px', color: themeStyles.subtext }}>
            <div>© 2026 GBGX Mobility Technologies Private Limited. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>Tower - B, The Corenthum, Noida Sector 62</span>
              <span>+91 88000 23537</span>
              <span>contact@gbgx.in</span>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}