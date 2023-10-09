export default {

    data() {
        return {
            perPage: 5,
            pageOptions: [3, 5, 10],
            totalRows: 1,
            currentPage: 1,
            sortBy: "",
            sortDesc: false,
            sortDirection: "asc",
            filter: null,
            filterOn: [],
            infoModal: {
                id: "info-modal",
                title: "",
                content: "",
            },
            fields: [
                {
                    key: "id",
                    label: "Id",
                },
                {
                    key: "avatar",
                    label: "Avatar",
                },
                { key: "full_name", label: "Full Name", sortable: true },
                { key: "post", label: "Post", sortable: true },
                "email",
                "city",
                "start_date",
                "salary",
                "age",
                "experience",
                { key: "status", label: "Status", sortable: true },
            ],
            items: [
                {
                    id: 1,
                    // eslint-disable-next-line global-require
                    avatar: require("@/assets/images/avatars/10-small.png"),
                    full_name: "Korrie O'Crevy",
                    post: "Nuclear Power Engineer",
                    email: "kocrevy0@thetimes.co.uk",
                    city: "Krasnosilka",
                    start_date: "09/23/2016",
                    salary: "$23896.35",
                    age: "61",
                    experience: "1 Year",
                    status: 2,
                },
            ],
            status: [
                {
                    1: "Current",
                    2: "Professional",
                    3: "Rejected",
                    4: "Resigned",
                    5: "Applied",
                },
                {
                    1: "light-primary",
                    2: "light-success",
                    3: "light-danger",
                    4: "light-warning",
                    5: "light-info",
                },
            ],
        };
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter((f) => f.sortable)
                .map((f) => ({ text: f.label, value: f.key }));
        },
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.items.length;
    },
    methods: {
        info(item, index, button) {
            this.infoModal.title = `Row index: ${index}`;
            this.infoModal.content = JSON.stringify(item, null, 2);
            this.$root.$emit("bv::show::modal", this.infoModal.id, button);
        },

        resetInfoModal() {
            this.infoModal.title = "";
            this.infoModal.content = "";
        },

        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
    },
}
