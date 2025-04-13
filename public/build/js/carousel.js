document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-about');
    const items = document.querySelectorAll('.carousel-item-1, .carousel-item-2, .carousel-item-3, .carousel-item-4, .carousel-item-5');

    if (!carousel) return;

    const updateFocusedItem = () => {
        const carouselRect = carousel.getBoundingClientRect();
        const carouselCenter = carouselRect.left + carouselRect.width / 2;

        let closestItem = null;
        let closestDistance = Infinity;

        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(carouselCenter - itemCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestItem = item;
            }
        });

        items.forEach(item => item.classList.remove('focused'));
        if (closestItem) {
            closestItem.classList.add('focused');
        }
    };

    // Focus inicial
    updateFocusedItem();

    // Focus al hacer scroll
    carousel.addEventListener('scroll', () => {
        updateFocusedItem();
    });

    // Opcional: si cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        updateFocusedItem();
    });
});