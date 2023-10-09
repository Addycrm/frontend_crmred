
export default function usePermission() {

    const permissions = []

    const getModules = () => {
        this.$store.dispatch("appRole/getModules").then((data) => {
            data.forEach((element) => {
                permissions.push({
                    modulos: element.subject,
                    crear: element.action == "create" ? true : false,
                    Actualizar: element.action == 2 ? true : false,
                    Leer: element.action == "read" ? true : false,
                    Eliminar: element.action == 4 ? true : false,
                });
            });
        });
    };

    const getPermissionRole = () => {
        let params = this.$route.params.slug;
        this.$store
            .dispatch("appRole/getPermissionRole", { roles: params })
            .then((data) => {
            });
    };

    return {
        getModules,
        permissions,
        getPermissionRole
    }
}