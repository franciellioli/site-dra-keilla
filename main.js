// Configuração central de contato — edite aqui para atualizar o site inteiro
const CONFIG = {
  nome: 'Dra. Keilla Vachanski',
  whatsappNumero: '5545999882126', // (45) 99988-2126
  whatsappMsg: 'Olá! Vim pelo site e gostaria de agendar uma consulta.',
  instagram: 'https://instagram.com/keilla_psiquiatra',
  instagramLabel: '@keilla_psiquiatra',
  email: 'contato@keillavachanski.com.br', // ajuste se houver e-mail oficial
  endereco: 'R. Marechal Cândido Rondon, 1096 - Sala 302, Cascavel - PR',
  crm: 'CRM-PR 26.759',
  rqe: 'RQE 24.169 / RQE 30.864',
};

function whatsappUrl(msg) {
  const texto = encodeURIComponent(msg || CONFIG.whatsappMsg);
  return `https://wa.me/${CONFIG.whatsappNumero}?text=${texto}`;
}

document.addEventListener('DOMContentLoaded', () => {
  // Preenche todos os links de WhatsApp
  document.querySelectorAll('.js-whatsapp').forEach((el) => {
    el.href = whatsappUrl();
    el.target = '_blank';
    el.rel = 'noopener';
  });

  // Ano do rodapé
  const ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  // Cabeçalho mais sólido ao rolar
  const header = document.querySelector('.header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu mobile
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const aberto = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(aberto));
      toggle.classList.toggle('is-active', aberto);
    });
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('is-active');
      });
    });
  }

  // "Você se reconhece?" — frases marcáveis (nada é enviado ou guardado)
  const chips = document.querySelectorAll('.chip');
  const n = document.getElementById('recog-n');
  const msg = document.getElementById('recog-msg');
  const cta = document.getElementById('recog-cta');
  const mensagens = [
    'Marque quantas quiser. Ninguém vê suas respostas além de você.',
    'Uma frase já basta para merecer atenção. Conversar com uma especialista ajuda a entender o que está acontecendo.',
    'Você não está exagerando. O que você sente tem nome, e tem tratamento.',
    'Você tem carregado muita coisa sozinho(a). Que tal dividir esse peso numa consulta?',
  ];
  const atualizar = () => {
    const total = document.querySelectorAll('.chip[aria-pressed="true"]').length;
    if (n) n.textContent = total;
    if (msg) msg.textContent = mensagens[total === 0 ? 0 : total === 1 ? 1 : total <= 3 ? 2 : 3];
    if (cta) cta.textContent = total === 0 ? 'Quero uma avaliação' : 'Quero conversar sobre isso';
  };
  chips.forEach((c) => c.addEventListener('click', () => {
    c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    atualizar();
  }));

  // Formulário de contato -> abre WhatsApp com os dados preenchidos
  const form = document.getElementById('form-contato');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      if (form.site.value) return; // honeypot anti-spam
      const nome = form.nome.value.trim();
      const telefone = form.telefone.value.trim();
      const mensagem = form.mensagem.value.trim();
      if (!nome || !telefone || !form.aceite.checked) {
        if (status) status.textContent = 'Preencha nome, telefone e aceite a política de privacidade.';
        return;
      }
      const texto = `Olá! Meu nome é ${nome} (tel. ${telefone}). ${mensagem || 'Gostaria de agendar uma consulta.'}`;
      const link = document.createElement('a');
      link.href = whatsappUrl(texto);
      link.target = '_blank';
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      link.remove();
      if (status) status.textContent = 'Abrindo o WhatsApp para você concluir o envio.';
      form.reset();
    });
  }
});
