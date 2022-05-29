<template>
  <q-page class="auth-container">
    <q-header class="m-header"><span>E-Schools</span></q-header>
    <div class="contenedor">
      <div class="btn-container">
        <div class="btn-addnew" @click="goBack">Volver atrás</div>
      </div>
      <div class="contenido">
        <div class="title">Condiciones de uso</div>
        <div class="text">
          <h5>Quiénes somos</h5>
          La presente página web (E-Schools), tiene dirección URL y está
          identificada con los datos que puedes encontrar en la Política de
          Privacidad
          <span class="ver-otro" @click="goOtro"
            >(ver política de privacidad)</span
          >.
          <h5>Qué regulan las Condiciones</h5>
          Las presentes condiciones de uso regulan el acceso y utilización de
          los servicios de la sociedad de la información que ponemos a vuestra
          disposición como usuarios de la red Internet a través del Sitio Web
          (en cualquiera de sus modalidades, aplicaciones, etc. y para cualquier
          tipo de dispositivos -fijos o móviles- a través de los cuales se
          acceda al Sitio Web), así como, en general, la relación entre vosotros
          Usuarios y el Sitio Web, a salvo de otras comunicaciones, condiciones
          e instrucciones particulares o específicas, que en cada caso se pongan
          en vuestro conocimiento.<br /><br />
          Vuestro acceso o mera utilización del Sitio Web implica la adhesión
          como Usuarios a las Condiciones publicadas en cada momento en el Sitio
          Web y que estarán disponibles para los Usuarios. En consecuencia,
          debes leer atentamente estas Condiciones. En cualquier momento, podrás
          guardar o imprimir las Condiciones y aconsejamos que lo hagas.
          <h5>
            Información previa para el acceso a los servicios del Sitio Web
          </h5>
          Antes de usar los servicios del Sitio Web o de registraros, los
          Usuarios asumís expresamente que sois personas capaces de discernir,
          que habéis entrado al Sitio Web por vuestra propia voluntad y que no
          habéis sido coaccionados para ello, y que la selección de los
          servicios que llevéis a cabo la hacéis por vuestra sola y única cuenta
          y riesgo, aceptando expresamente estas Condiciones y la
          <span class="ver-otro" @click="goOtro">Política de Privacidad</span>,
          así como aquellos otros avisos e instrucciones, comunicaciones, o
          condiciones particulares, que en cada caso se ponga en vuestro
          conocimiento.<br /><br />
          En relación con las condiciones particulares que regulen otros
          servicios del Sitio Web, estas Condiciones completan lo previsto en
          esas condiciones particulares en la medida que no se opongan a las
          mismas.<br /><br />
          Debes saber que las comunicaciones a través de redes abiertas están
          expuestas a amenazas que hacen que no sean seguras. La Sociedad adopta
          todas las medidas de seguridad adecuadas para un correcto
          funcionamiento del Sitio Web. No obstante, el Usuario debe adoptar
          todas las medidas técnicas que le correspondan para controlar
          razonablemente estas amenazas (tener sistemas actualizados de
          detección de software malicioso, tales como virus, troyanos, etc.,
          tener actualizados los parches de seguridad de los correspondientes
          navegadores). Como Usuario eres el único y exclusivo responsable del
          uso por tu parte del Sitio Web y de los servicios y, consciente de
          ello, aceptas voluntariamente tal responsabilidad.
          <h5>En relación con los menores</h5>
          En relación con la navegación en el Sitio Web por menores, a salvo de
          lo indicado en los párrafos anteriores, los Usuarios quedáis
          advertidos que la Sociedad no puede controlar, aparte de otras
          circunstancias, que menores de edad hagan uso del Sitio Web y de sus
          servicios. Por ello, además de no admitir el Sitio Web, la Sociedad ni
          su Grupo empresarial responsabilidad alguna al respecto, se comunica
          que serán los padres y tutores los únicos responsables de controlar y
          asistir a los menores en la navegación por este Sitio Web y habilitar
          cualesquiera otros mecanismos necesarios que, en su caso, impidan el
          acceso por parte de los menores al Sitio Web y/o sus servicios, no
          admitiendo la Sociedad ninguna reclamación al respecto.
          <h5>Claves de acceso o similares</h5>
          En caso de que algún servicio del Sitio Web incluya claves de acceso o
          nombres de usuario, elegirás e indicarás tus propias claves de acceso
          (nombre de usuario, contraseña, o similar), sin perjuicio de otros
          datos que se puedan solicitar en el correspondiente formulario, y no
          pudiendo elegir para ello palabras, expresiones o conjuntos
          gráfico-denominativos malsonantes, injuriosos, coincidentes con
          marcas, nombres comerciales, rótulos de establecimientos,
          denominaciones sociales, expresiones publicitarias, nombres y
          seudónimos de personajes de relevancia pública o famosos para cuya
          utilización no esté autorizado y, en general, contrarios a la ley o a
          las exigencias de la moral y buenas costumbres generalmente
          aceptadas.<br /><br />
          La asignación del nombre de usuario se produce de manera automática
          previa elección del Usuario. En el supuesto de que estas claves
          solicitadas se encuentren reservadas, deberás introducir unas nuevas
          claves de acceso.<br /><br />
          El Usuario se compromete a hacer un uso diligente de las claves de
          acceso, a no ponerlas a disposición de terceros, y a comunicar a la
          Sociedad la pérdida o robo de las claves de acceso y el posible acceso
          por un tercero a las mismas.<br /><br />
          Como Usuario eres el único y exclusivo responsable de tu
          identificación de acceso al servicio. Las consecuencias derivadas de
          su uso por terceros, su mal uso, pérdida u olvido del código secreto
          de acceso de los usuarios - password - o bien del nombre de usuario
          son de tu única y exclusiva responsabilidad.
          <h5>Características generales de los servicios</h5>
          Los servicios a los que puedes acceder en el Sitio Web son, por regla
          general, gratuitos sin que los Usuarios tengáis que realizar
          contraprestación alguna para poder disfrutar de ellos, salvo en lo
          relativo al coste de conexión a través de la red de telecomunicaciones
          suministrada por el proveedor de acceso que hubieras contratado. No
          obstante lo anterior el acceso a determinados contenidos del Sitio Web
          puede ser no gratuitos en función entre otros factores de volumen de
          accesos por el Usuario o por el tipo de contenidos, de lo que, en todo
          caso, se os informará y, en su caso, se exigirá vuestra suscripción o
          registro.
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "PoliticaPrivPage",
  data() {
    return {};
  },
  setup() {},
  methods: {
    goBack() {
      this.$router.push("/curso/miscursos");
    },
    goOtro() {
      this.$router.push("/legal/politica-privacidad");
    },
  },
});
</script>

<style scoped>
.contenedor {
  max-width: 1400px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  padding: 0 25px;
}

.btn-addnew {
  background-color: #05beed;
  display: inline-block;
  padding: 10px;
  color: white;
  margin: 25px 0;
  cursor: pointer;
  border-radius: 3px;
  font-size: 1.1em;
  transition: 0.2s ease;
  margin-right: 10px;
}

.btn-addnew:hover {
  background-color: #12ccfc;
}

.btn-container {
  margin-bottom: 50px;
}

.title {
  font-size: 3em;
  position: relative;
  margin-bottom: 50px;
}

.title::before {
  content: "";
  position: absolute;
  width: 100px;
  height: 2px;
  background-color: black;
  bottom: -20px;
}

.text {
  font-size: 1.1em;
}

.m-header {
  height: 75px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.m-header span {
  margin-left: 50px;
  font-size: 1.2em;
}

ul {
  list-style-type: none;
}

ul li {
  margin: 20px 0;
  position: relative;
}

ul li::before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #1976d2;
  border-radius: 50%;
  top: 6px;
  left: -25px;
}

h5 {
  border-bottom: 2px solid #1976d2;
  padding-bottom: 10px;
}

.ver-otro {
  color: #1976d2;
  cursor: pointer;
}

.ver-otro:hover {
  text-decoration: underline;
}
</style>
