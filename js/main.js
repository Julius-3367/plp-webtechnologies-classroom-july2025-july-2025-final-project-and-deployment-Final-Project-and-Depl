document.addEventListener('DOMContentLoaded', function(){
  // year
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // mobile nav
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('primary-nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // mark active nav link based on current path
  const links = document.querySelectorAll('.primary-nav a');
  links.forEach(a => {
    try {
      const href = new URL(a.href);
      if(href.pathname === window.location.pathname || (href.pathname === '/' && window.location.pathname.endsWith('index.html'))){
        a.classList.add('active');
      }
    } catch (e) { /* ignore invalid URLs */ }
  });

  // smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const tgt = document.querySelector(this.getAttribute('href'));
      if(tgt){ e.preventDefault(); tgt.scrollIntoView({behavior:'smooth'}); }
    });
  });

  // simple contact form validation
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');
      const feedback = document.getElementById('formFeedback');
      let errors = [];
      if(!name.value.trim()) errors.push('Name is required.');
      if(!email.value.trim()) errors.push('Email is required.');
      else if(!/^\S+@\S+\.\S+$/.test(email.value)) errors.push('Email looks invalid.');
      if(!message.value.trim()) errors.push('Message cannot be empty.');
      if(errors.length){
        feedback.textContent = errors.join(' ');
        feedback.style.color = '#b00020';
      } else {
        feedback.textContent = 'Thanks — this demo form does not send messages. Configure a backend or Netlify Forms to receive messages.';
        feedback.style.color = 'green';
        form.reset();
      }
    });
  }
});
