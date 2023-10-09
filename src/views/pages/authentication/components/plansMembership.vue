<template>
    <b-card>
        <div class="container-fluid gtco-features" id="planes">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <svg id="bg-services" width="80%" viewBox="0 0 1000 800" style="inset: 0; margin: 0 auto;">
                            <defs>
                                <linearGradient id="PSgrad_02" x1="64.279%" x2="0%" y1="76.604%" y2="0%">
                                    <stop offset="0%" stop-color="#8541ff" stop-opacity="1" />
                                    <stop offset="100%" stop-color="#f0beff" stop-opacity="1" />
                                </linearGradient>
                            </defs>
                            <path fill-rule="evenodd" opacity="0.102" fill="url(#PSgrad_02)"
                                d="M801.878,3.146 L116.381,128.537 C26.052,145.060 -21.235,229.535 9.856,312.073 L159.806,710.157 C184.515,775.753 264.901,810.334 338.020,792.380 L907.021,652.668 C972.912,636.489 1019.383,573.766 1011.301,510.470 L962.013,124.412 C951.950,45.594 881.254,-11.373 801.878,3.146 Z" />
                        </svg>
                        <div class="row">
                            <div class="col-lg-12">
                                <h2 class="text-center text-uppercase">Membresia</h2>

                            </div>
                        </div>
                        <div class="row plane-state">
                            <div class="col">
                                <div class="row justify-content-center nav-planes d-md-none">
                                    <div class="col-12">
                                        <div class="row m-0">

                                            <div class="col p-0 plan estandar" ref="estandar" data-target="estandar">
                                                <div class="head-table">Estándar</div>
                                            </div>
                                            <div class="col p-0 plan elite off" ref="elite" data-target="elite">
                                                <div class="head-table">Profesional</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-12 col-md-6 col-lg-4 flex-column p-0 d-none d-lg-flex">
                                        <div class="card servicios">
                                            <div class="head-table">Planes</div>
                                            <table class="table-planes">
                                                <tbody>
                                                    <tr v-for="(service, index) in tabServices" :key="index">
                                                        <td>{{ service.name }}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div class="col-card-plan estandar  col-12 col-md-4 col-lg d-flex flex-column p-0"
                                        :class="[(check == 2) ? 'active' : 'off']">
                                        <div class="card plan estandar">
                                            <div class="head-table">Estandar</div>
                                            <table class="table-planes">
                                                <tbody>
                                                    <tr>
                                                        <td data-label="Precio">
                                                            <b>
                                                                $120.000 COP
                                                            </b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Usuarios">
                                                            3
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Usuarios adicionales">
                                                            $20.000 C/U
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Acceso al MLS">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Inventarios Corporativos">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Pagina Web Propia">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Tarjeta Vitual">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Marketing Inteligente">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                            500 correos
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Cantidad Inmuebles">
                                                            1000
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Cantidad Clientes">
                                                            500
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Academia Virtual">
                                                            Cursos Basicos
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Acceso a Oficinas">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Acceso a Entrenamientos Presenciales">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Soporte Virtual">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td data-label="Portales incluidos">
                                                            GRATUITOS
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Plataformas de descuentos">
                                                            <i class="icon danger">
                                                                <svg class="w-6 h-6 text-gray-800 dark:text-white"
                                                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                                    fill="currentColor" viewBox="0 0 20 20">
                                                                    <path
                                                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>



                                                    <tr>
                                                        <td data-label="Seleccionar Plan">
                                                            <b-button v-if="propsSelect.enableBtn" variant="outline-primary"
                                                                size="lg" class="w-100 text-uppercase"
                                                                :class="{ 'activeBtn': check == 2 }" @click="selectPlan(2)">
                                                                Seleccionar Estandar
                                                            </b-button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-card-plan elite  col-12 col-md-4 col-lg d-flex flex-column p-0"
                                        :class="[(check == 4) ? 'active' : 'off']">
                                        <div class="card plan elite">
                                            <div class="head-table">Profesional</div>
                                            <table class="table-planes">
                                                <tbody>
                                                    <tr>
                                                        <td data-label="Precio">
                                                            <b>
                                                                $360.000 COP
                                                            </b>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Usuarios">
                                                            5
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Usuarios adicionales">
                                                            $15.000 C/U
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Acceso al MLS">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Inventarios Corporativos">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Pagina Web Propia">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Tarjeta Vitual">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Marketing Inteligente">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                            1000 correos
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Cantidad Inmuebles">
                                                            Ilimitado
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Cantidad Clientes">
                                                            Ilimitado
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Academia Virtual">
                                                            Cursos Especializados
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Acceso a Oficinas">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Acceso a Entrenamientos Presenciales">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td data-label="Soporte Virtual">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td data-label="Portales incluidos">
                                                            Gratuitos + Proppit (Nuroa, Nestoria, Mitula, Trovit, Punto
                                                            propiedad, Properati) + Mercadolibre
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td data-label="Soporte Virtual">
                                                            <i class="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                    <path
                                                                        d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                                                                </svg>
                                                            </i>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td data-label="Seleccionar Plan">
                                                            <b-button v-if="propsSelect.enableBtn" variant="outline-primary"
                                                                size="lg" class="w-100 text-uppercase"
                                                                :class="{ 'activeBtn': check == 4 }" @click="selectPlan(4)">
                                                                Seleccionar Profesional
                                                            </b-button>


                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </b-card>
</template>
<script >
import { $themeConfig } from '@themeConfig';
import axios from "axios";
export default {
    mounted() {
        this.changeTab();

        $wompi.initialize(function (data, error) {
            if (error === null) {
                var sessionId = data.sessionId
                // `sessionId` current un string, por ejemplo: "1289_1696830983722-ab493d40c02e-278bab34-323va3"
            }
        })
    },
    props: {
        propsSelect: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            check: this.propsSelect.enableDefaultPlan,
            tabServices:
                [
                    { "name": "Precio" },
                    { "name": "Cantidad de agentes" },
                    { "name": "Agentes Adicionales" },
                    { "name": "Gestion de Inmueble y Acceso al MLS" },
                    { "name": "Página Web Propia + Tarjeta Virtual" },
                    { "name": "Modulo de Agenda y Tareas" },

                    { "name": "Modulo CRM (Embudos, Leads Automaticos)" },
                    { "name": "Modulo de Mercadeo" },
                    { "name": "Cant. Inmuebles" },
                    { "name": "Cant. Clientes" },
                    { "name": "Academia Virtual" },
                    { "name": "Conexion Portales Inmobiliarios" },
                    { "name": "Soporte y Asistencia" },
                    { "name": "Acceso APP Android" },
                    { "name": "Portales Incluidos" },
                    { "name": "Programa de Recompensas" },
                    // { "name": "Seleccionar Plan" }
                ]
        }
    },
    computed: {

    },
    methods: {
        async selectPlan(ref) {
            this.check = ref
            await this.$store.dispatch("appBancks/getPlanForId", ref).then(() => {
            }).catch(() => {
            });
            this.$emit('selectPlan', ref)
        },
        changeTab() {
            for (let _ref in this.$refs) {
                this.$refs[_ref].addEventListener('click', () => {
                    let _colCardPlan = document.querySelectorAll('.col-card-plan');
                    _colCardPlan.forEach((item) => {
                        item.classList.add('off');
                        if (item.classList.contains(_ref))
                            item.classList.remove('off');
                    });

                    let _navPlan = document.querySelectorAll('.nav-planes .plan');
                    _navPlan.forEach((item) => {
                        item.classList.add('off');
                        if (item.classList.contains(_ref))
                            item.classList.remove('off');
                    });
                })
            }
        },

        showMenuMobile: function () {
            let state = false
            function onClickMenu(event) {
                if (document.getElementById('btn_menu-mobile').contains(event.target)) {
                    state = true
                }
                else {
                    state = false
                }
            }
            window.addEventListener('click', onClickMenu(event))
            this.menuState = !this.menuState
        }
    },
    setup() {
        const { appName, appLogoImage } = $themeConfig.app;

        return {
            appLogoImage,
        }
    },
}
</script>


<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Open+Sans:wght@300;400;500;600;700&display=swap');

:root {
    --primary: #7367f0;
    --estandar: #dfd487;
    --color-sec: #3c30bf;
    --color-tri: #1c1193;

}

b {
    font-weight: 700;

}

p {
    font-family: "Open Sans";
    font-weight: 400;
    color: #666666;
    font-size: 16px;
    line-height: 2;

}

#Home {
    font-family: "Open Sans";
    font-weight: 400;
    color: #212529;

}

.active {
    border: 4px solid #28c76f !important;
    border-radius: 15px;
}

.activeBtn {
    background-color: #28c76f !important;
    color: white !important;
    border: white !important;
}

.btn .icon svg,
a .icon svg {
    width: 75%;
    height: 75%;
    fill: currentColor;
    position: static;
    margin: 0;
}

.gtco-feature h2,
.gtco-features h2 {
    font-family: "Lato";
    font-weight: 700;
    color: #000000;
    font-size: 36px;
    margin-bottom: 30px;
    text-transform: capitalize;

}

@media(max-width: 1199px) {

    .gtco-feature h2,
    .gtco-features h2 {
        font-size: 30px;
    }
}

.card {
    border: none;
    background: transparent;

}

.gtco-feature {
    margin-top: 100px;

}

.gtco-feature .card .back-bg {
    margin-left: -30px !important;
    margin-top: -20px;

}

.gtco-feature .card svg {
    display: block;
    margin-left: auto;
    margin-right: auto;

}

.gtco-feature .card svg.defs {
    position: absolute;
    width: 0;
    height: 0;

}

.gtco-feature .card .squircle {
    width: 100%;
    height: 450px;
    background-position-x: -50px;

}

.gtco-feature p small {
    font-size: 16px;

}

.gtco-feature a {
    margin-top: 20px;
    display: inline-block;

}

.gtco-features {
    margin-top: 100px;

}

@media(max-width: 1199px) {
    .gtco-features {
        margin-top: 50px;
    }
}

.gtco-features svg {
    position: absolute;
    margin-left: -100px;
    margin-top: 40px;

}

@media (max-width: 767px) {
    .gtco-features svg {
        margin: 0 auto;
        margin-top: 200px;

    }
}

@media (max-width: 991px) {
    .gtco-features h2 {
        margin-top: 0;

    }
}

.gtco-features .col-lg-8 {
    padding: 10px 100px;

}

@media (max-width: 767px) {
    .gtco-features .col-lg-8 {
        padding: 10px 0;

    }
}

@media (max-width: 600px) {
    .gtco-features .col-lg-8 .row .col:first-child {
        margin-top: 50px;

    }
}

@media (max-width: 600px) {
    .gtco-features .col-lg-8 .col {
        flex: 0 0 100%;
        max-width: 100%;

    }
}

.gtco-features .card {
    background: #fff;
    margin: 30px 5px;
    padding: 20px 10px;
    border-radius: 20px;
    box-shadow: 0 15px 40px 0 rgba(0, 0, 0, 0.08);
    overflow: visible;

}

.gtco-features .card .oval {
    background: linear-gradient(to right, #f1f6fd, #f0fbfe);
    padding: 10px;
    width: 150px;
    border-radius: 50%;
    margin: auto;
    transform: rotate(20deg);
    margin-top: 20px;

}

.gtco-features .card .card-img-top {
    max-width: 0.8in;
    margin: 0 auto;
    transform: rotate(-20deg);

}

.gtco-features .card h3 {
    font-family: "Lato";
    font-weight: 600;
    font-size: 22px;
    color: var(--color-sec);

}

.gtco-features .card p {
    font-size: 14px;
    line-height: 1.8 !important;

}

.gtco-numbers-block {
    margin: 100px auto;
    margin-top: 200px;
    color: #fff;

}

@media (max-width: 600px) {
    .gtco-numbers-block {
        margin-top: 100px;

    }
}

@media (max-width: 1299px) {
    .gtco-numbers-block .row {
        max-width: 1000px;
        margin: 0 auto;

    }
}

@media (max-width: 767px) {
    .gtco-numbers-block .row .col-3 {
        padding: 0;

    }
}

.gtco-numbers-block #custom-map::before {
    position: absolute;
    content: "";
    height: 100px;
    width: 100%;
    border: 2px solid red;

}

.gtco-numbers-block svg {
    margin-top: -100px;
    position: absolute;
    left: 0;
    max-width: 1500px;
    right: 0;
    margin-left: auto;
    margin-right: auto;

}

@media (max-width: 1299px) {
    .gtco-numbers-block svg {
        margin-top: -90px;

    }
}

@media (max-width: 1199px) {
    .gtco-numbers-block svg {
        margin-top: -60px;

    }
}

@media (max-width: 991px) {
    .gtco-numbers-block svg {
        margin-top: -40px;

    }
}

@media (max-width: 650px) {
    .gtco-numbers-block svg {
        margin-top: -20px;

    }
}

@media (max-width: 600px) {
    .gtco-numbers-block svg {
        margin-top: -10px;

    }
}

.gtco-numbers-block h5 {
    font-family: "Lato";
    font-weight: 700;
    font-size: 60px;

}

@media (max-width: 1299px) {
    .gtco-numbers-block h5 {
        font-size: 48px;

    }
}

@media (max-width: 767px) {
    .gtco-numbers-block h5 {
        font-size: 24px;

    }
}

@media (max-width: 600px) {
    .gtco-numbers-block h5 {
        margin: 0;
        font-size: 18px;

    }
}

.gtco-numbers-block p {
    font-family: "Lato";
    font-weight: 600;
    font-size: 24px;
    color: #fff;

}

@media (max-width: 1299px) {
    .gtco-numbers-block p {
        font-size: 18px;

    }
}

@media (max-width: 991px) {
    .gtco-numbers-block p {
        font-size: 16px;

    }
}

@media (max-width: 991px) {
    .gtco-numbers-block p {
        font-size: 16px;

    }
}

@media (max-width: 600px) {
    .gtco-numbers-block p {
        line-height: 1.1 !important;

    }
}

@media (max-width: 500px) {
    .gtco-numbers-block p {
        font-size: 8px;

    }
}

.gtco-testimonials {
    position: relative;
    margin-top: 200px;

}

@media (max-width: 767px) {
    .gtco-testimonials {
        margin-top: 100px;

    }
}

.gtco-testimonials h2 {
    font-family: "Lato";
    font-weight: 500;
    font-size: 36px;
    text-align: center;
    color: #333333;
    margin-bottom: 100px;

}

.gtco-testimonials .owl-stage-outer {
    padding-bottom: 30px;

}

.gtco-testimonials .owl-nav {
    display: none;

}

.gtco-testimonials .owl-dots {
    text-align: center;

}

.gtco-testimonials .owl-dots span {
    position: relative;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    display: block;
    background: #fff;
    border: 2px solid #01e6f8;
    margin: 0 5px;

}

.gtco-testimonials .owl-dots .active {
    box-shadow: none;

}

.gtco-testimonials .owl-dots .active span {
    background: #01e6f8;
    box-shadow: none;
    height: 12px;
    width: 12px;
    margin-bottom: -1px;

}

.gtco-testimonials .card {
    background: #fff;
    box-shadow: 0 15px 40px 0 rgba(0, 0, 0, 0.08);
    margin: 0 30px;
    padding: 0 20px;
    border-radius: 50px;

}

.gtco-testimonials .card .card-img-top {
    max-width: 100px;
    border-radius: 50%;
    margin: 0 auto;
    border: 5px solid #1d3ede;
    width: 100px;
    height: 100px;

}

.gtco-testimonials .card h5 {
    color: #1d3ede;
    font-size: 21px;
    line-height: 1.3 !important;
    font-family: "Lato";
    font-weight: 500;

}

.gtco-testimonials .card h5 span {
    font-size: 18px;
    color: #666666;
    font-family: "Open Sans";
    font-weight: 400;

}

.gtco-testimonials .card p {
    font-size: 18px;

}

.gtco-testimonials .active {
    opacity: 0.5;
    transition: all 0.3s;

}

.gtco-testimonials .center {
    opacity: 1;

}

.gtco-testimonials .center h5 {
    font-size: 24px;

}

.gtco-testimonials .center h5 span {
    font-size: 20px;

}

.gtco-testimonials .center p {
    font-size: 20px;

}

.gtco-testimonials .center .card-img-top {
    max-width: 100%;
    height: 120px;
    width: 120px;

}

.gtco-features-list {
    margin-top: 100px;

}

.gtco-features-list .media {
    margin: 20px 0;

}

.gtco-features-list .oval {
    border-radius: 50%;
    background-color: white;
    box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.1);
    padding: 15px;
    height: 60px;
    width: 60px;

}

.gtco-features-list .oval .align-self-start {
    width: 100%;
    padding: 3px;

}

.gtco-features-list .media-body {
    font-family: "Open Sans";
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    padding-right: 20px;

}

.gtco-features-list .media-body h5 {
    font-family: "Lato";
    font-weight: 600;
    margin-bottom: 20px !important;
    font-size: 22px;

}

.gtco-logo-area {
    margin: 50px auto;

}

.gtco-logo-area .col .img-fluid {
    max-height: 32px;

}

@media (max-width: 600px) {
    .gtco-logo-area .col {
        flex: 0 0 50%;
        max-width: 50%;
        margin: 20px 0;

    }
}




@media (max-width: 767px) {
    .gtco-news .owl-carousel .card h5 {
        font-size: 18px;

    }
}

.gtco-news .owl-carousel .card p {
    font-size: 17px;

}

@media (max-width: 767px) {
    .gtco-news .owl-carousel .card p {
        font-size: 15px;

    }
}

.gtco-news .owl-carousel .card a {
    padding-top: 3px !important;
    padding-bottom: 3px !important;

}

.form-group input::-webkit-input-placeholder,
.form-group input::-moz-placeholder,
.form-group input:-ms-input-placeholder,
.form-group input:-moz-placeholder,
.form-group textarea::-webkit-input-placeholder,
.form-group textarea::-moz-placeholder,
.form-group textarea:-ms-input-placeholder,
.form-group textarea:-moz-placeholder {
    color: #999999;
    font-family: "Open Sans";
    font-weight: 400;
    font-size: 18px;

}

.form-group textarea {
    min-height: 200px;
    border-radius: 30px;
    padding-top: 20px;
    padding-right: 20px;
    resize: none;
}

.coming-soon {
    display: block;
    font-size: 18px;
    text-align: center;
    font-weight: 700;
    font-style: italic;
    color: var(--color-sec);

}

.gtco-features h2::after {
    content: '';
    background: var(--primary);
    display: block;
    width: 3rem;
    height: 3px;
    margin-top: 8px;
}

.gtco-features h2.text-center::after {
    margin-left: auto;
    margin-right: auto;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group legend {
    font-size: 1rem;
    line-height: 1.4 !important;
}

.form-group legend .required {
    color: red;
    font-size: 0.9em;
    margin-left: 8px;
}

.form {
    display: block;
    width: 100%;
}

.logo {
    margin-bottom: 0;
    margin-right: 1rem;
}

.logo img {
    height: 30px;
    width: auto;
    display: block;
}

.nav.nav-tabs {
    border-bottom: 0;
    justify-content: center;
}

.text_bold {
    font-weight: bold;

}

.nav-link {
    font-size: 2.5rem;
    padding: 8px 4px;
    color: var(--primary);
    background: #fff;
}

.nav-link:hover {
    cursor: pointer;
    border-radius: 20px;
    border: 1px solid var(--primary);
    transition: all ease 0.4s;

}

.nav.nav-tabs .nav-item:first-child .nav-link {
    border-left-width: 2px;
    border-radius: 10px 0 0 10px;
}

.nav.nav-tabs .nav-item:last-child .nav-link {
    border-right-width: 2px;
    border-radius: 0 10px 10px 0;
}

.nav.nav-tabs .nav-link.active {
    color: #fff;
    background: var(--primary);
}

ul.list-items {
    padding: 0;
    list-style: none;
    border-top: 1px solid #ddd;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
}

ul.list-items li.list-item {
    margin-top: 20px;
}

ul.list-items li.list-item span {
    font-size: 0.65em;
    line-height: 1.4 !important;
    display: block;
    color: #777;
    margin-top: 2px;
}

.table-planes tr {
    background: #fff;
}

.table-planes tr:nth-child(even) {
    background: #f3f3f3;
}

.card.plan,
.card.servicios {
    margin: 10px;
    padding: 0;
}

.table-planes {
    margin-top: 1rem;
}

.table-planes td {
    padding: 10px 25px;
    border: none;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.head-table {
    font-size: 24px;
    line-height: 1.4;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-transform: uppercase;
    font-weight: 700;
    padding: 15px 25px;
    border-bottom: 2px solid #7367f0;
    border-radius: 20px 20px 0 0;

}

.head-table span {
    font-size: 0.6em;
    font-weight: 600;
    line-height: 1;
}

.head-table,
.table-planes td {
    justify-content: center;
}

/* .plan .head-table {
    color: #fff;
  } */
.plan.basic .head-table {
    background: var(--primary);
    color: white;
}

.plan.estandar .head-table {
    background: #dfd487;
    color: #fff;
}

.plan.elite .head-table {
    background: var(--color-tri);
    border-color: var(--color-tri);
}

.plan.elite .head-table {
    background: linear-gradient(-45deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C) center / 210%;
    border-color: transparent;
}

.table-planes .icon {
    width: 1.25em;
    display: block;
    font-size: 20px;
    color: var(--success);
}

.table-planes .icon svg {
    display: block;
    width: auto;
    height: 1em;
    position: static;
    margin: 0 auto;
    fill: currentColor;
}

.table-planes .icon.danger {
    color: var(--danger);
}

[data-label="Precio"] {
    font-size: 18px;
}

[data-label="Precio"] i {
    display: block;
    line-height: 1 !important;
    font-weight: 400;
    font-size: 0.75em;
    text-align: center;
}

.text-planes {
    font-size: 20px;
    text-align: center;
}

p.nota-planes {
    margin: 1rem 0 0;
    font-style: italic;
    font-size: 14px;

}

.btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid #0000;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

@media(max-width: 991px) {

    .plan .head-table[data-v-ed4b9358] {
        color: #fff;
        position: sticky;
        top: 55px;
    }

    .table-planes td {
        color: #000;
        font-weight: 500;
        height: 90px;
    }

    td[data-label]::before {
        content: attr(data-label);
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 8px;
        text-align: center;
    }
}

@media(max-width: 767px) {

    .gtco-feature h2,
    .gtco-features h2 {
        font-size: 24px;
    }

    p {
        font-size: 14px;
    }

    .gtco-features .card h3 {
        font-size: 20px;
    }

    #portales {
        padding-top: 40px;
        padding-bottom: 40px;
    }

    .text-planes {
        font-size: 14px;
    }

    .btns-store img {
        height: 11vw;
    }

    .plan .head-table {
        padding: 5%;
        margin: 2.5%;
        font-size: 14px;
        height: 50px;
        border-radius: 6px;
        border-bottom: none;
    }

    .nav-planes {
        background: #f6f6f6;
        position: sticky;
        top: 55px;
        z-index: 2;
    }

    :not(.nav-planes)>div>div>div>.head-table {
        display: none;
    }

    .nav-planes .plan.basic {
        transition: all ease 0.4s;
        color: white;
    }

    .nav-planes .plan.basic.off .head-table {
        background: #fff !important;
        color: var(--primary);
        box-shadow: inset 0 0 0 2px var(--primary);
    }

    .nav-planes .plan.estandar.off .head-table {
        background: #fff !important;
        color: var(--estandar);
        box-shadow: inset 0 0 0 2px var(--estandar);
    }

    .nav-planes .plan.estandar.off .head-table {
        background: #fff !important;
        color: #dfd487;
        box-shadow: 0 0 0 2px #dfd487;
    }

    .nav-planes .plan.elite.off .head-table {
        background: #fff !important;
        color: var(--color-tri);
        box-shadow: inset 0 0 0 2px var(--color-tri);
    }

    .nav-planes .plan.elite.off .head-table {
        background: #fff !important;
        color: #b48829;
        box-shadow: 0 0 0 2px #b58a2c;
    }

    .col-card-plan {
        transition: all ease 0.4s;
    }

    .col-card-plan.off {
        display: none !important;
    }
}

.plane-state {
    position: relative;
}

.plane-state .seal-trial {
    position: absolute;
    z-index: 1;
    inset: 0;
    margin: auto;
    width: 60%;
    max-width: 400px;
}

.plane-state .seal-trial~.row {
    filter: grayscale(1);
    opacity: 0.7;
}
</style>
<style>
#app {
    overflow: hidden;
    overflow-y: auto;
}
</style>
