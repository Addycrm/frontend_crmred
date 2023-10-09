import moment from "moment"

export default {
	data() {
        return {
            inmuebleSelected:null,
            agenElitetSelected:null,
            isInfoProperty:null,
            formTransactions:{
                inmuebleId:null,
                direccion:null,
                statePosition:null,
                cityPosition:null,
                zonePosition:null,
                barrioPosition:null,
                tContractId:null,
                Ttype:null,
                plataformDays:null,
                idUser:null,
                nameUser:null
            },
            // formAgentElite:{
            //     idUser:null,
            //     nameUser:null
            // }
        }
    },
    computed:{
        typeContract(){
            return this.$store.state.appTransactions.typeContract
        },
        typeTransactions(){
            return this.$store.state.appTransactions.typeTransactions
        }
    },

    watch:{
        inmuebleSelected(){
            if(this.inmuebleSelected!=null) {
                this.formTransactions.inmuebleId= this.inmuebleSelected.id
                this.formTransactions.direccion= this.inmuebleSelected.direccion
                this.formTransactions.statePosition= this.inmuebleSelected.estado_id.name
                this.formTransactions.cityPosition= this.inmuebleSelected.ciudad_id.name
                this.formTransactions.zonePosition=this.inmuebleSelected.zona_id.name
                this.formTransactions.barrioPosition=this.inmuebleSelected.barrio_id.name
                this.handlePlataform()
                this.isInfoProperty=true
            }
        },
        agenElitetSelected(){
            this.formTransactions.idUser =this.agenElitetSelected.id
            this.formTransactions.nameUser = this.agenElitetSelected.userdata.primer_nombre
        }
    },
    methods: {
        handlePlataform(){
            if(this.inmuebleSelected.created_at!=null){
                const date_created= moment(this.inmuebleSelected.created_at);
                const dateToday = moment();
                this.formTransactions.plataformDays= dateToday.diff(date_created,'days')
            }
        }
    },
}