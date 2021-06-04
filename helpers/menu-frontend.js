const getMenuFrontEnd = (role = 'USER_ROL') => {
    const menu = [
        {
            titulo: 'Dashboard', icon: 'mdi mdi-gauge', submenu: [
                {titulo: 'Main', url: '/'},
                {titulo: 'ProgressBar', url: 'progress'},
                {titulo: 'Gráficas', url: 'grafica1'},
                {titulo: 'Promesas', url: 'promesas'},
                {titulo: 'Rxjs', url: 'rxjs'},
            ]
        }
    ];

    if (role === 'ADM_ROLE') {
        menu.push(
            {
                titulo: 'Mantenimiento', icon: 'mdi mdi-folder-lock-open', submenu: [
                    {titulo: 'Usuarios', url: 'usuarios'},
                    {titulo: 'Hospitales', url: 'hospitales'},
                    {titulo: 'Médicos', url: 'medicos'}
                ]
            }
        )
    }

    return menu;
}

module.exports = {
    getMenuFrontEnd
}