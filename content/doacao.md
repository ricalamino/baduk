---
title: "💝 Doação"
date: 2024-09-19T12:00:00-03:00
draft: false
menu: "main"
weight: 100
---

<div class="page-hero donation-hero">
  <div class="hero-content">
    <h1 class="hero-title">💝 Ajude a Manter o Baduk.com.br Gratuito!</h1>
    <p class="hero-description">Este site é mantido com muito carinho para ensinar Go de forma gratuita e interativa</p>
  </div>
</div>

<div class="donation-methods">
  <div class="donation-method">
    <img src="/img/pix_icon.png" alt="PIX" class="method-icon-img">
    <h3>PIX (Brasil)</h3>
    <p class="method-description">Doação instantânea e gratuita via PIX</p>
    <div class="qr-code-container">
      <img src="/img/qr_pix.png" alt="QR Code PIX" class="qr-code">
    </div>
    <div class="method-address">go@alami.no</div>
    <p><strong>Chave PIX:</strong> go@alami.no</p>
    <button onclick="copyPixKey()" class="mobile-donate-btn">📋 Copiar Chave PIX</button>
  </div>

  <div class="donation-method">
    <span class="method-icon">⚡</span>
    <h3>Lightning Network</h3>
    <p class="method-description">Bitcoin via Lightning Network</p>
    <div class="qr-code-container">
      <img src="/img/qr_lightning.png" alt="QR Code Lightning" class="qr-code">
    </div>
    <div class="method-address">⚡️ala@primal.net</div>
    <p><strong>Para carteiras:</strong> Zeus, Phoenix, Breez</p>
    <a href="lightning:ala@primal.net" class="mobile-donate-btn">⚡ Doar via Lightning</a>
  </div>
</div>

<div class="goals-section">
  <h2>🎯 Meu Objetivo</h2>
  <p>Se eu recebesse doações suficientes, poderia <strong>remover todas as propagandas</strong> e manter o site 100% limpo e focado no aprendizado!</p>
  
  <div class="goals-grid">
    <div class="goal-card">
      <span class="goal-icon">🏠</span>
      <h4>Hospedagem</h4>
      <p>Custos de servidor e infraestrutura</p>
    </div>
    <div class="goal-card">
      <span class="goal-icon">🌐</span>
      <h4>Domínio</h4>
      <p>Certificados SSL e manutenção</p>
    </div>
    <div class="goal-card">
      <span class="goal-icon">🔧</span>
      <h4>Manutenção</h4>
      <p>Atualizações e melhorias</p>
    </div>
    <div class="goal-card">
      <span class="goal-icon">🚫</span>
      <h4>Sem Propagandas</h4>
      <p>Site 100% limpo quando meta for atingida</p>
    </div>
  </div>
</div>

<div class="why-donate">
  <h2>💡 Por que Doar?</h2>
  <ul>
    <li><strong>Site 100% gratuito</strong> - Sem paywall ou conteúdo premium</li>
    <li><strong>Conteúdo de qualidade</strong> - Traduzido e adaptado para português</li>
    <li><strong>Interface limpa</strong> - Foco no aprendizado, não em vendas</li>
    <li><strong>Comunidade</strong> - Ajuda a manter a comunidade de Go no Brasil</li>
    <li><strong>Educação</strong> - Promove o ensino do jogo mais antigo do mundo</li>
  </ul>
</div>

<div class="support-section">
  <div class="support-card">
    <h3>📊 Meta de Doações</h3>
    <p><strong>Meta mensal:</strong> R$ 200,00</p>
    <p><strong>Meta atingida:</strong> Propagandas removidas! 🎉</p>
    <p>Mesmo que não possa doar agora, sua visita e aprendizado já são uma grande contribuição!</p>
  </div>
</div>

---

<div class="credits-section">
  <h3>🙏 Agradecimento</h3>
  <p>O Go é um jogo maravilhoso e fico feliz em poder compartilhar esse conhecimento com você!</p>
  <p><em>Obrigado por fazer parte desta jornada de aprendizado! 🎯</em></p>
</div>

<script>
function copyPixKey() {
  const pixKey = 'go@alami.no';
  
  // Try to use the modern clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(pixKey).then(function() {
      showCopySuccess();
    }).catch(function() {
      fallbackCopyTextToClipboard(pixKey);
    });
  } else {
    // Fallback for older browsers
    fallbackCopyTextToClipboard(pixKey);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showCopySuccess();
    } else {
      showCopyError();
    }
  } catch (err) {
    showCopyError();
  }
  
  document.body.removeChild(textArea);
}

function showCopySuccess() {
  const button = document.querySelector('button[onclick="copyPixKey()"]');
  const originalText = button.innerHTML;
  button.innerHTML = '✅ Copiado!';
  button.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
  
  setTimeout(function() {
    button.innerHTML = originalText;
    button.style.background = 'linear-gradient(135deg, #6c9922, #8bc34a)';
  }, 2000);
}

function showCopyError() {
  const button = document.querySelector('button[onclick="copyPixKey()"]');
  const originalText = button.innerHTML;
  button.innerHTML = '❌ Erro ao copiar';
  button.style.background = 'linear-gradient(135deg, #f44336, #ef5350)';
  
  setTimeout(function() {
    button.innerHTML = originalText;
    button.style.background = 'linear-gradient(135deg, #6c9922, #8bc34a)';
  }, 2000);
}
</script>
