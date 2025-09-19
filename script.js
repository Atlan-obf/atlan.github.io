// Prepínanie medzi kategóriami
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Zrušiť active z ostatných
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.menu-content').forEach(c => c.classList.remove('active'));

        // Aktivovať vybraný
        tab.classList.add('active');
        const target = tab.getAttribute('data-tab');
        document.getElementById(target).classList.add('active');
    });
});
