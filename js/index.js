/**
 * Script de navigation fluide pour le site Pesa Na Bana
 * 
 * Ce script gère:
 * 1. La navigation fluide lors du clic sur les liens du menu
 * 2. L'activation des liens du menu en fonction de la section visible
 * 3. L'animation des éléments sociaux dans le footer
 */

document.addEventListener('DOMContentLoaded', function() {
    // Ajouter la classe smooth-scroll au body pour activer le défilement fluide
    document.body.classList.add('smooth-scroll');
    
    // Sélectionner tous les liens de navigation
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    
    // Ajouter un gestionnaire d'événements à chaque lien
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Empêcher le comportement par défaut du lien
            e.preventDefault();
            
            // Obtenir l'ID de la section cible à partir de l'attribut href
            const targetId = this.getAttribute('href');
            
            // Trouver l'élément cible
            const targetSection = document.querySelector(targetId);
            
            // Si la section cible existe, faire défiler jusqu'à elle
            if (targetSection) {
                // Calculer la position de défilement en tenant compte de la hauteur de la barre de navigation
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Faire défiler jusqu'à la position cible avec une animation fluide
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Mettre à jour l'URL sans recharger la page
                history.pushState(null, null, targetId);
                
                // Mettre à jour la classe active
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Fonction pour mettre à jour la classe active en fonction de la section visible
    function updateActiveLink() {
        // Obtenir la position de défilement actuelle
        const scrollPosition = window.scrollY;
        
        // Parcourir toutes les sections
        document.querySelectorAll('section').forEach(section => {
            // Calculer la position de la section
            const sectionTop = section.offsetTop - 100; // Ajuster pour la hauteur de la navbar
            const sectionHeight = section.offsetHeight;
            
            // Vérifier si la section est visible
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Trouver le lien correspondant à cette section
                const id = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.navbar .nav-link[href="#${id}"]`);
                
                // Mettre à jour la classe active
                if (correspondingLink) {
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // Ajouter un gestionnaire d'événements pour le défilement
    window.addEventListener('scroll', updateActiveLink);
    
    // Animer les icônes sociales dans le footer
    const socialIcons = document.querySelectorAll('.ftco-footer-social li');
    
    // Observer l'intersection avec le viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter la classe d'animation lorsque le footer est visible
                socialIcons.forEach((icon, index) => {
                    setTimeout(() => {
                        icon.style.opacity = '1';
                        icon.style.visibility = 'visible';
                    }, index * 100);
                });
                
                // Arrêter d'observer une fois que l'animation est déclenchée
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observer le footer
    const footer = document.querySelector('.footer-08');
    if (footer) {
        observer.observe(footer);
    }
    
    // Initialiser l'état actif du lien au chargement de la page
    updateActiveLink();
});