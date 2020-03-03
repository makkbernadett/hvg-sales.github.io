$(function() {
    $('#sti').focus(function() {
        if (this.value == 'Felcímre keres')
            this.value = '';
    });
    $('#sti').blur(function() {
        if (this.value == '')
            this.value = 'Felcímre keres';
    });
    
    $('#ti').focus(function() {
        if (this.value == 'Címre keres')
            this.value = '';
    });
    $('#ti').blur(function() {
        if (this.value == '')
            this.value = 'Címre keres';
    });
}); 