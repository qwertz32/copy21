$(document).ready(function () {
    // Function to toggle sidebar visibility
    function toggleSidebar() {
        const sidebar = $('#event-sidebox');
        sidebar.toggleClass('hidden');
    }

    // Event listener for hamburger menu button
    $('#sidebar-fun').click(function () {
        toggleSidebar();
    });
});