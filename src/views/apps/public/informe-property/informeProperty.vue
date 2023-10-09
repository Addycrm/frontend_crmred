<!-- <template>
  <div id="FormInmueble">
    <div class="container-property">
      <header class="header_logo">
        <figure class="container__logo">
          <img :src="detail.user_id.empresa.logo" :alt="detail.user_id.empresa.nombre" class="image_logo">
        </figure>
        <div class="info-empresa">
          <h2 class="text-empresa_info">Titulo inmueble</h2>
          <p class="text-empresa_info">email</p>
          <p class="text-empresa_info">2131232132</p>
        </div>
      </header>
      <h2 class="title">Informe de la propiedad : {{detail.titulo_inmueble}}</h2>
      <section class="container__body">
        <p class="subtitle">
          Compartimos con usted la gestión que se ha realizado por los diferentes portales de su propiedad y las
          visitas que se han tenido por parte de usuarios interesados y visitas que ha tenido el inmueble.
        </p>
        <div class="container__table">
          <p>
            <strong>Portales inmobiliarios en los que tenemos cargada la propiedad con los respectivos links </strong>
          </p>
          <table class="content-table"> 
            <thead> 
              <tr> 
                <th>Portal</th> 
                <th>Enlace Publicacion</th> 
              </tr> 
            </thead>
            <tbody> 
              <tr> 
                <td>Logo</td> 
                <td>url</td> 
              </tr> 
              <tr>
                <td>LOgo 2</td> 
                <td>url</td> 
              </tr> 
              <tr> 
                <td>Logo 3</td> 
                <td>url</td> 
              </tr> 
            </tbody> 
          </table>
        </div>
        <div class="container__table">
          <p>
            <strong>Visitas realizadas al inmueble . </strong>
          </p>
          <table class="content-table"> 
            <thead> 
              <tr> 
                <th>Fecha</th> 
                <th>Tipo de cita</th> 
                <th>Nombre Agente</th>
              </tr> 
            </thead>
            <tbody> 
              <tr> 
                <td>Logo</td> 
                <td>url</td> 
                <td>url</td> 

              </tr> 
              <tr>
                <td>LOgo 2</td> 
                <td>url</td> 
                <td>url</td> 

              </tr> 
              <tr> 
                <td>Logo 3</td> 
                <td>url</td> 
                <td>url</td> 

              </tr> 
            </tbody> 
          </table>
        </div>
      </section>
    </div>
  </div>  
</template> -->

<template>
  <div>
    <header class="clearfix">
		<div class="container">
			<figure>
				<img class="logo" :src="detail.user_id.empresa.logo" alt="">
			</figure>
			<div class="company-address">
				<h2 class="title">{{ detail.user_id.empresa.nombre }}</h2>
				<p>
					{{ detail.user_id.empresa.direccion }}.
				</p>
			</div>
			<div class="company-contact">
				<div class="phone left">
					<span class="circle"><img src="data:image/svg+xml;charset=utf-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIg0KCSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjkuNzYycHgiIGhlaWdodD0iOS45NThweCINCgkgdmlld0JveD0iLTQuOTkyIDAuNTE5IDkuNzYyIDkuOTU4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IC00Ljk5MiAwLjUxOSA5Ljc2MiA5Ljk1OCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8dGl0bGU+RmlsbCAxPC90aXRsZT4NCjxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPg0KPGcgaWQ9IlBhZ2UtMSIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+DQoJPGcgaWQ9IklOVk9JQ0UtMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMwMS4wMDAwMDAsIC01NC4wMDAwMDApIiBza2V0Y2g6dHlwZT0iTVNBcnRib2FyZEdyb3VwIj4NCgkJPGcgaWQ9IlpBR0xBVkxKRSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAuMDAwMDAwLCAxNS4wMDAwMDApIiBza2V0Y2g6dHlwZT0iTVNMYXllckdyb3VwIj4NCgkJCTxnIGlkPSJLT05UQUtUSSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjY3LjAwMDAwMCwgMzUuMDAwMDAwKSIgc2tldGNoOnR5cGU9Ik1TU2hhcGVHcm91cCI+DQoJCQkJPGcgaWQ9Ik92YWwtMS1feDJCXy1GaWxsLTEiPg0KCQkJCQk8cGF0aCBpZD0iRmlsbC0xIiBmaWxsPSIjOEJDMzRBIiBkPSJNOC43NjUsMTIuMzc1YzAuMDIsMC4xNjItMC4wMjgsMC4zMDMtMC4xNDMsMC40MjJMNy4yNDYsMTQuMTkNCgkJCQkJCWMtMC4wNjIsMC4wNy0wLjE0MywwLjEzMy0wLjI0MywwLjE4MmMtMC4xMDEsMC4wNDktMC4xOTcsMC4wOC0wLjI5NSwwLjA5NGMtMC4wMDcsMC0wLjAyOCwwLTAuMDYyLDAuMDA0DQoJCQkJCQljLTAuMDM0LDAuMDA1LTAuMDgsMC4wMDgtMC4xMzQsMC4wMDhjLTAuMTMxLDAtMC4zNDMtMC4wMjMtMC42MzUtMC4wNjhjLTAuMjkzLTAuMDQ1LTAuNjUxLTAuMTU4LTEuMDc2LTAuMzM2DQoJCQkJCQljLTAuNDI0LTAuMTgyLTAuOTA0LTAuNDUxLTEuNDQyLTAuODA5Yy0wLjUzNi0wLjM1Ny0xLjEwOS0wLjg1Mi0xLjcxNi0xLjQ3OWMtMC40ODEtMC40ODQtMC44OC0wLjk1LTEuMTk4LTEuMzkzDQoJCQkJCQlDMC4xMjgsOS45NS0wLjEyNSw5LjU0MS0wLjMxOSw5LjE2NGMtMC4xOTMtMC4zNzYtMC4zMzgtMC43MTctMC40MzQtMS4wMjNjLTAuMDk3LTAuMzA2LTAuMTYxLTAuNTctMC4xOTUtMC43OTINCgkJCQkJCWMtMC4wMzUtMC4yMjEtMC4wNS0wLjM5NC0wLjA0Mi0wLjUyMWMwLjAwNy0wLjEyNiwwLjAxLTAuMTk3LDAuMDEtMC4yMTFjMC4wMTQtMC4wOTksMC4wNDQtMC4xOTgsMC4wOTMtMC4zMDENCgkJCQkJCWMwLjA0OS0wLjEwMSwwLjEwOC0wLjE4NCwwLjE3Ni0wLjI0N2wxLjM3NS0xLjQwM2MwLjA5Ny0wLjA5OCwwLjIwNi0wLjE0NywwLjMzLTAuMTQ3YzAuMDksMCwwLjE2OSwwLjAyNiwwLjIzOCwwLjA3OQ0KCQkJCQkJQzEuMyw0LjY0OCwxLjM1OSw0LjcxNCwxLjQwNiw0Ljc5MWwxLjEwNiwyLjE0MWMwLjA2MiwwLjExNCwwLjA4LDAuMjM1LDAuMDUyLDAuMzdDMi41MzgsNy40MzYsMi40NzgsNy41NDgsMi4zODksNy42NA0KCQkJCQkJTDEuODgzLDguMTU3QzEuODY5LDguMTcxLDEuODU2LDguMTk0LDEuODQ2LDguMjI2QzEuODM1LDguMjU2LDEuODMsOC4yODMsMS44Myw4LjMwNGMwLjAyNywwLjE0NywwLjA5LDAuMzE3LDAuMTg3LDAuNTA3DQoJCQkJCQljMC4wODIsMC4xNjksMC4yMSwwLjM3NSwwLjM4MiwwLjYxOGMwLjE3MiwwLjI0MywwLjQxNywwLjUyMSwwLjczNCwwLjgzOWMwLjMxMSwwLjMyMiwwLjU4NSwwLjU3NCwwLjgyOCwwLjc1NQ0KCQkJCQkJYzAuMjQsMC4xNzgsMC40NDMsMC4zMDksMC42MDQsMC4zOTVjMC4xNjIsMC4wODUsMC4yODYsMC4xMzUsMC4zNzIsMC4xNTRsMC4xMjgsMC4wMjRjMC4wMTUsMCwwLjAzOC0wLjAwNiwwLjA2Ny0wLjAxNg0KCQkJCQkJYzAuMDMyLTAuMDEsMC4wNTQtMC4wMjEsMC4wNjctMC4wMzdsMC41ODgtMC42MTJjMC4xMjUtMC4xMTIsMC4yNy0wLjE2OCwwLjQzNi0wLjE2OGMwLjExNywwLDAuMjA3LDAuMDIxLDAuMjc3LDAuMDYxaDAuMDENCgkJCQkJCWwxLjk5NSwxLjIwM0M4LjY1MSwxMi4xMiw4LjczNywxMi4yMzQsOC43NjUsMTIuMzc1TDguNzY1LDEyLjM3NXoiLz4NCgkJCQk8L2c+DQoJCQk8L2c+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==" alt=""><span class="helper"></span></span>
					<a href="tel:602-519-0450">{{  detail.user_id.empresa.telefono }}</a>
					<span class="helper"></span>
				</div>
				<div class="email right">
					<span class="circle"><img src="data:image/svg+xml;charset=utf-8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIg0KCSB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE0LjE3M3B4Ig0KCSBoZWlnaHQ9IjE0LjE3M3B4IiB2aWV3Qm94PSIwLjM1NCAtMi4yNzIgMTQuMTczIDE0LjE3MyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwLjM1NCAtMi4yNzIgMTQuMTczIDE0LjE3MyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSINCgk+DQo8dGl0bGU+ZW1haWwxOTwvdGl0bGU+DQo8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4NCjxnIGlkPSJQYWdlLTEiIHNrZXRjaDp0eXBlPSJNU1BhZ2UiPg0KCTxnIGlkPSJJTlZPSUNFLTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MTcuMDAwMDAwLCAtNTUuMDAwMDAwKSIgc2tldGNoOnR5cGU9Ik1TQXJ0Ym9hcmRHcm91cCI+DQoJCTxnIGlkPSJaQUdMQVZMSkUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwLjAwMDAwMCwgMTUuMDAwMDAwKSIgc2tldGNoOnR5cGU9Ik1TTGF5ZXJHcm91cCI+DQoJCQk8ZyBpZD0iS09OVEFLVEkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2Ny4wMDAwMDAsIDM1LjAwMDAwMCkiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPg0KCQkJCTxnIGlkPSJPdmFsLTEtX3gyQl8tZW1haWwxOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE3LjAwMDAwMCwgMC4wMDAwMDApIj4NCgkJCQkJPHBhdGggaWQ9ImVtYWlsMTkiIGZpbGw9IiM4QkMzNEEiIGQ9Ik0zLjM1NCwxNC4yODFoMTQuMTczVjUuMzQ2SDMuMzU0VjE0LjI4MXogTTEwLjQ0LDEwLjg2M0w0LjYyNyw2LjAwOGgxMS42MjZMMTAuNDQsMTAuODYzDQoJCQkJCQl6IE04LjEyNSw5LjgxMkw0LjA1LDEzLjIxN1Y2LjQwOUw4LjEyNSw5LjgxMnogTTguNjUzLDEwLjI1M2wxLjc4OCwxLjQ5M2wxLjc4Ny0xLjQ5M2w0LjAyOSwzLjM2Nkg0LjYyNEw4LjY1MywxMC4yNTN6DQoJCQkJCQkgTTEyLjc1NSw5LjgxMmw0LjA3NS0zLjQwM3Y2LjgwOEwxMi43NTUsOS44MTJ6Ii8+DQoJCQkJPC9nPg0KCQkJPC9nPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=" alt=""><span class="helper"></span></span>
					<a href="mailto:company@example.com">{{ detail.user_id.empresa.email }}</a>
					<span class="helper"></span>
				</div>
			</div>
		</div>
	</header>

	<section>
		<div class="container">
			<div class="details clearfix">
				<div class="client left">
					<p>ENVIADO A:</p>
					<p class="name">{{ detail.user_id.userdata.primer_nombre }}</p>
					<p>796 Silver Harbour, TX 79273, US</p>
					<a href="mailto:john@example.com">john@example.com</a>
				</div>
				<div class="data right">
					<div class="title">{{detail.titulo_inmueble}}</div>
					<div class="date">
						Fecha de creación informe:
            <span>{{ startDate }}</span><br/>
            Fecha de creacion inmueble en la plataforma:
            <span>{{ formatDate(detail.created_at)}}</span>
					</div>
				</div>
			</div>
		<div class="container_portales">
			<p class="text_info">
			<strong> Compartimos con usted la publicación de su inmueble que se ha realizado por los diferentes portales inmobiliarios que manejamos y las vistas que se han tenido por parte de clientes interesados en su propiedad. </strong>
			</p>
			<table border="0" cellspacing="0" cellpadding="0">
			<thead>
				<tr>
				<th class="qty">Portal</th>
				<th class="unit">Enlace de publicación</th>
				</tr>
			</thead>
			<tbody>
				<tr>
				<td class="qty">Logo</td>
				<td class="unit">url</td>
				</tr>
				<tr>
				<td class="qty">Logo</td>
				<td class="unit">url</td>
				</tr>
				<tr>
				<td class="qty">Logo</td>
				<td class="unit">url</td>
				</tr>
			</tbody>
			</table>
		</div>
		<div class="container_visits">
			<p class="text_info">
			<strong> Visitas realizadas al inmueble.</strong>
			</p>
			<table border="0" cellspacing="0" cellpadding="0">
			<thead>
				<tr>
				<th class="qty">Fecha</th>
				<th class="unit">Tipo de cita</th>
				<th class="unit">Nombre Agente</th>
				</tr>
			</thead>
			<tbody>
				<tr>
				<td class="qty">Logo</td>
				<td class="unit">url</td>
				<td class="unit">url</td>
				</tr>
				<tr>
				<td class="qty">Logo</td>
				<td class="unit">url</td>
				<td class="unit">url</td>
				</tr>
				<tr>
				<td class="qty">Logo</td>
				<td class="unit">url</td>
				<td class="unit">url</td>
				</tr>
			</tbody>
			</table>
		</div>
			<!-- <div class="no-break">
				<table class="grand-total">
					<tbody>
						<tr>
							<td class="desc"></td>
							<td class="qty"></td>
							<td class="unit">SUBTOTAL:</td>
							<td class="total">$5,200.00</td>
						</tr>
						<tr>
							<td class="desc"></td>
							<td class="qty"></td>
							<td class="unit">TAX 25%:</td>
							<td class="total">$1,300.00</td>
						</tr>
						<tr>
							<td class="desc"></td>
							<td class="unit" colspan="2">GRAND TOTAL:</td>
							<td class="total">$6,500.00</td>
						</tr>
					</tbody>
				</table>
			</div> -->
		</div>
	</section>

	<footer>
		<div class="container">
			<div class="thanks">Muchas gracias por su atencion!</div>
			<div class="notice">
				<div>NOTICE:</div>
				<!-- <div>A finance charge of 1.5% will be made on unpaid balances after 30 days.</div> -->
			</div>
			<div class="end">Invoice was created on a computer and is valid without the signature and seal.</div>
		</div>
	</footer>
  </div>
</template>
<script>
import moment from "moment";

export default{
  data() {
    return {
      startDate:null
    }
  },
  
  props:{
    detail:{
      type:Object
    }
  },

  computed:{

  },


  created() {
    this.intiInmuebleDetail;
    this.startDate = moment().format("DD/MM/YYYY");
  },
  data(){
    return{
      DataInmueble:null
    }
  },
  methods: {
    formatDate(value){
      const date = new Date(value)
      return date.toLocaleDateString('en-GB')
    },
    intiInmuebleDetail(){
        const {slug} = this.route.params;
    }
  },
}
</script>

<style scoped>
  html, body, div, span, applet, object, iframe,
		h1, h2, h3, h4, h5, h6, p, blockquote, pre,
		a, abbr, acronym, address, big, cite, code,
		del, dfn, em, img, ins, kbd, q, s, samp,
		small, strike, strong, sub, sup, tt, var,
		b, u, i, center,
		dl, dt, dd, ol, ul, li,
		fieldset, form, label, legend,
		table, caption, tbody, tfoot, thead, tr, th, td,
		article, aside, canvas, details, embed,
		figure, figcaption, footer, header, hgroup,
		menu, nav, output, ruby, section, summary,
		time, mark, audio, video {
			margin: 0;
			padding: 0;
			border: 0;
			font: inherit;
			font-size: 100%;
			vertical-align: baseline;
		}

		html {
			line-height: 1;
		}

		ol, ul {
			list-style: none;
		}

		table {
			border-collapse: collapse;
			border-spacing: 0;
		}

		caption, th, td {
			text-align: left;
			font-weight: normal;
			vertical-align: middle;
		}

		q, blockquote {
			quotes: none;
		}
		q:before, q:after, blockquote:before, blockquote:after {
			content: "";
			content: none;
		}

		a img {
			border: none;
		}

		article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
			display: block;
		}

		body {
			font-family: 'Source Sans Pro', sans-serif;
			font-weight: 300;
			font-size: 12px;
			margin: 0;
			padding: 0;
		}
		body a {
			text-decoration: none;
			color: inherit;
		}
		body a:hover {
			color: inherit;
			opacity: 0.7;
		}
		body .container {
			min-width: 500px;
			margin: 0 auto;
			padding: 0 20px;
		}
		body .clearfix:after {
			content: "";
			display: table;
			clear: both;
		}
		body .left {
			float: left;
		}
		body .right {
			float: right;
		}
		body .helper {
			display: inline-block;
			height: 100%;
			vertical-align: middle;
		}
		body .no-break {
			page-break-inside: avoid;
		}

		header {
			margin-top: 20px;
			margin-bottom: 50px;
		}
		header figure {
			float: left;
			max-width: 8rem;
			max-height: 8rem;
			margin-right: 10px;
			background-color: #8BC34A;
			text-align: center;
		}
		header figure img {
			padding-left: 5px;
			padding-top: 5px;
			width: 100%;
		}
		header .company-address {
			max-width: 400px;
			line-height: 1.7em;
		}
		header .company-address .title {
			color: #8BC34A;
			font-weight: bold;
			font-size: 2rem;
			text-transform: uppercase;
		}
		header .company-contact {
			float: right;
			height: 60px;
			padding: 0 10px;
			background-color: #8BC34A;
			color: white;
		}
		header .company-contact span {
			display: inline-block;
			vertical-align: middle;
		}
		header .company-contact .circle {
			width: 20px;
			height: 20px;
			background-color: white;
			border-radius: 50%;
			text-align: center;
		}
		header .company-contact .circle img {
			vertical-align: middle;
		}
		header .company-contact .phone {
			height: 100%;
			margin-right: 20px;
		}
		header .company-contact .email {
			height: 100%;
			min-width: 100px;
			text-align: right;
		}

		section .details {
			margin-bottom: 55px;
		}
		section .details .client {
			width: 50%;
			line-height: 20px;
		}
		section .details .client .name {
			color: #8BC34A;
		}
		section .details .data {
			width: 50%;
			text-align: right;
		}
		section .details .title {
			margin-bottom: 15px;
			color: #8BC34A;
			font-size: 2rem;
			font-weight: bold;
			text-transform: uppercase;
		}
		section table {
			width: 100%;
			border-collapse: collapse;
			border-spacing: 0;
			font-size: 0.9166em;
		}
    .qty{
      width: 10%;
    }
		.unit{
			width: 50%;
		}
		
    .text_info{
      margin:2rem 0;
    }

		section table thead {
			display: table-header-group;
			vertical-align: middle;
			border-color: inherit;
		}
		section table thead th {
			padding: 5px 10px;
			background: #8BC34A;
			border-bottom: 5px solid #FFFFFF;
			border-right: 4px solid #FFFFFF;
			text-align: right;
			color: white;
			font-weight: 400;
			text-transform: uppercase;
		}
		section table thead th:last-child {
			border-right: none;
		}
	
		section table thead .qty,.unit {
			text-align: center;
		}
		section table tbody td {
			padding: 10px;
			background: #E8F3DB;
			color: #777777;
			text-align: right;
			border-bottom: 5px solid #FFFFFF;
			border-right: 4px solid #E8F3DB;
		}
		section table tbody td:last-child {
			border-right: none;
		}
		section table tbody h3 {
			margin-bottom: 5px;
			color: #8BC34A;
			font-weight: 600;
		}
		section table tbody .desc {
			text-align: center;
		}
		section table tbody .qty {
			text-align: center;
		}
		section table.grand-total {
			margin-bottom: 45px;
		}
		section table.grand-total td {
			padding: 5px 10px;
			border: none;
			color: #777777;
			text-align: right;
		}
		section table.grand-total .desc {
			background-color: transparent;
		}
		section table.grand-total tr:last-child td {
			font-weight: 600;
			color: #8BC34A;
			font-size: 1.18181818181818em;
		}

		footer {
			margin-bottom: 20px;
		}
		footer .thanks {
			margin-bottom: 40px;
			color: #8BC34A;
			font-size: 1.16666666666667em;
			font-weight: 600;
		}
		footer .notice {
			margin-bottom: 25px;
		}
		footer .end {
			padding-top: 5px;
			border-top: 2px solid #8BC34A;
			text-align: center;
		}
</style>

<!-- <style scoped>
.header_logo{
  display: flex;
  gap: 1rem;
}
.info-empresa{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.text-empresa_info{
  margin-bottom: 6px;
  color: black;
}
.container__logo{
  display: flex;
  justify-content: right;
}
.image_logo{
  width: 10rem;
  height: 10rem;
}
.container-property{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-items: center;
}
.title{
  text-align: center;
}
.subtitle{
  text-align: justify;
}
.container__body{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container__table{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content-table { border-collapse: collapse; margin: 25px 0; font-size: 1em; font-family: sans-serif; min-width: 450px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.15); }
.content-table thead tr { background-color: var( --primary); color: #ffffff; text-align: middle; }
.content-table th, .content-table td { padding: 12px 15px; }

.content-table tbody tr { border-bottom: 1px solid #dddddd; } .content-table tbody tr:nth-of-type(even) { background-color: #f3f3f3; } .content-table tbody tr:last-of-type { border-bottom: 2px solid #009879; }
</style> -->