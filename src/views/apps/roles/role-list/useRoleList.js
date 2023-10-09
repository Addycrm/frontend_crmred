import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useInvoicesList() {
  // Use toast
  const toast = useToast()

  const refInvoiceListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'nombre', label: 'Nombre del rol', sortable: true, thStyle: { backgroundColor: '#7482D3', color: "#fff" } },
    { key: 'descripcion', label: 'Descripcion', sortable: true, thStyle: { backgroundColor: '#7482D3', color: "#fff", width: "300px", fontSize: '13px' } },
    { key: 'action', label: 'Acciones', sortable: true, thStyle: { backgroundColor: '#3eef33' } },
  ]

  const filter = ref(null)
  const filterOn = []
  const perPage = ref(5)
  const totalRoles = ref(1)
  const currentPage = ref(1)
  const perPageOptions = [5, 10, 15, { value: 100, text: "Show a lot" }]
  const searchQuery = ref('')
  const sortBy = ref('id')//
  const isSortDirDesc = ref(true)
  const statusFilter = ref(null)



  const refetchData = () => {
    refInvoiceListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, statusFilter], () => {
    refetchData()
  })

  const onfiltered = ((filteredItems) => {     // Trigger pagination to update the number of buttons/pNits due to filtering
    totalRoles = filteredItems.length;
    this.currentPNit = 1;
  });

  const fetchRoles = (ctx, callback) => {
    store.dispatch('appRole/getRolesForUser')
      .then(response => {
        totalRoles.value = response.length;
        return response
      })
      .catch((data) => {
        toast({
          component: ToastificationContent,
          props: {
            title: data,
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  const fetchRolesPri = (ctx, callback) => {
    store.dispatch('appRole/getRoles')
      .then(response => {
        totalRoles.value = response.length;
        return response
      })
      .catch((data) => {
        toast({
          component: ToastificationContent,
          props: {
            title: data,
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }


  const getPermissions = (ctx, callback) => {
    store
      .dispatch("appRole/getModules", 1)
      .then((response) => {
        callback(response)
      })
      .catch((data) => {
      });
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveInvoiceStatusVariantAndIcon = status => {
    if (status === 'Partial Payment') return { variant: 'warning', icon: 'PieChartIcon' }
    if (status === 'Paid') return { variant: 'success', icon: 'CheckCircleIcon' }
    if (status === 'Downloaded') return { variant: 'info', icon: 'ArrowDownCircleIcon' }
    if (status === 'Draft') return { variant: 'primary', icon: 'SaveIcon' }
    if (status === 'Sent') return { variant: 'secondary', icon: 'SendIcon' }
    if (status === 'Past Due') return { variant: 'danger', icon: 'InfoIcon' }
    return { variant: 'secondary', icon: 'XIcon' }
  }

  const resolveClientAvatarVariant = status => {
    if (status === 'Partial Payment') return 'primary'
    if (status === 'Paid') return 'danger'
    if (status === 'Downloaded') return 'secondary'
    if (status === 'Draft') return 'warning'
    if (status === 'Sent') return 'info'
    if (status === 'Past Due') return 'success'
    return 'primary'
  }

  return {
    fetchRoles,
    fetchRolesPri,
    getPermissions,
    tableColumns,
    perPage,
    currentPage,
    totalRoles,
    onfiltered,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refInvoiceListTable,
    statusFilter,
    filter,
    filterOn,

    resolveInvoiceStatusVariantAndIcon,
    resolveClientAvatarVariant,

    refetchData,
  }
}
