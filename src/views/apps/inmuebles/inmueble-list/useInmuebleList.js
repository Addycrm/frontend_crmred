import { ref, watch, computed } from "@vue/composition-api";
import store from "@/store";

// Notification
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default function useInmueblesList() {
  // Use toast
  const toast = useToast();

  const refInmuebleListTable = ref(null);

  // Table Handlers
  const tableColumns = [
    { key: "id", label: "#", sortable: true },
    { key: "image_principal", sortable: true },
    { key: "titulo_inmueble", label: "Tipo de documento", sortable: true },
    { key: "precio_venta", sortable: true },
  ];
  const perPage = ref(10);
  const totalInmuebles = ref(0);
  const currentPage = ref(1);
  const perPageOptions = [10, 25, 50, 100];
  const searchQuery = ref("");
  const sortBy = ref("id"); //
  const isSortDirDesc = ref(true);
  const statusFilter = ref(null);

  const dataMeta = computed(() => {
    const localItemsCount = refInmuebleListTable.value
      ? refInmuebleListTable.value.localItems.length
      : 0;
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalInmuebles.value,
    };
  });

  const refetchData = () => {
    refInmuebleListTable.value.refresh();
  };

  watch([currentPage, perPage, searchQuery, statusFilter], () => {
    refetchData();
  });

  const fetchInmuebles = (ctx, callback) => {
    store
      .dispatch("appInmueble/getInmuebles", {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        status: statusFilter.value,
      })
      .then((response) => {
        callback(response);
        totalInmuebles.value = response.length;
      })
      .catch((error) => {
        toast({
          component: ToastificationContent,
          props: {
            title: error,
            icon: "AlertTriangleIcon",
            variant: "danger",
          },
        });
      });
  };

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveInmuebleStatusVariantAndIcon = (status) => {
    if (status === "Partial Payment")
      return { variant: "warning", icon: "PieChartIcon" };
    if (status === "Paid")
      return { variant: "success", icon: "CheckCircleIcon" };
    if (status === "Downloaded")
      return { variant: "info", icon: "ArrowDownCircleIcon" };
    if (status === "Draft") return { variant: "primary", icon: "SaveIcon" };
    if (status === "Sent") return { variant: "secondary", icon: "SendIcon" };
    if (status === "Past Due") return { variant: "danger", icon: "InfoIcon" };
    return { variant: "secondary", icon: "XIcon" };
  };

  const resolveClientAvatarVariant = (status) => {
    if (status === "Partial Payment") return "primary";
    if (status === "Paid") return "danger";
    if (status === "Downloaded") return "secondary";
    if (status === "Draft") return "warning";
    if (status === "Sent") return "info";
    if (status === "Past Due") return "success";
    return "primary";
  };

  return {
    fetchInmuebles,
    tableColumns,
    perPage,
    currentPage,
    totalInmuebles,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refInmuebleListTable,

    statusFilter,

    resolveInmuebleStatusVariantAndIcon,
    resolveClientAvatarVariant,

    refetchData,
  };
}
