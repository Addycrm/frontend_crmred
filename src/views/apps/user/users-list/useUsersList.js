import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useUsersList() {
  // Use toast
  const toast = useToast()

  const refUserListTable = ref(null)
  
  const tableColumns = [
    { key: 'user', sortable: true },
    { key: 'email', sortable: true },
    { key: 'celular_movil', label: 'Celular', sortable: true },
    { key: 'estado_user', label: 'Estado', sortable: true },
    { key: 'roles', sortable: true },
    { key: 'genero', sortable: true },
    { key: 'userdata', label: '' },
    { key: 'actions' },
  ]
  
  const perPage = ref(5)
  const totalUsers = ref(0)
  const currentPage = ref(1)
  const filter = ref(null)
  const filterOn = ref([])
  const perPageOptions = [5, 10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const roleFilter = ref(null)
  const planFilter = ref(null)
  const statusFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refUserListTable.value ? refUserListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalUsers.value,
    }
  })

  const refetchData = () => {
    refUserListTable.value.refresh()
  }

  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Author", value: "author" },
    { label: "Editor", value: "editor" },
    { label: "Maintainer", value: "maintainer" },
    { label: "Subscriber", value: "subscriber" },
  ];


  watch([currentPage, perPage, searchQuery, roleFilter, planFilter, statusFilter], () => {
    refetchData()
  })

  const fetchUsers = (ctx, callback) => {
    store
      .dispatch('app-user/fetchUsers')
      .then(response => {
        callback(response)
        totalUsers.value = response.length;
        if (response.length == 0) {
          toast({
            component: ToastificationContent,
            props: {
              title: 'No hay usuarios por el momento',
              icon: 'AlertTriangleIcon',
              variant: 'success',
            },
          })
        }

      })
      .catch(() => {})
  }

  const fetchRoles = (ctx, callback) => {
    store
      .dispatch('appRole/getRolesForUserAll')
      .then(response => {
        callback(response)

        if (response.length == 0) {
          toast({
            component: ToastificationContent,
            props: {
              title: 'No hay roles por el momento',
              icon: 'AlertTriangleIcon',
              variant: 'success',
            },
          })
        }
      })
      .catch(() => {})
  }

  const fetchPaises = (ctx, callback) => {
    store
      .dispatch('appLocalidades/getPaises')
      .then(response => {
        callback(response)
      })
      .catch(() => {})
  }

  const fetchStates = (ctx, callback) => {
    store
      .dispatch('appLocalidades/getStates')
      .then(response => {
        callback(response)
      })
      .catch((data) => {
      })
  }

  const fetchCiudad = (ctx, callback) => {
    store
      .dispatch('appLocalidades/getCiudades')
      .then(response => {
        callback(response)
      })
      .catch(() => {})
  }

  const resolveUserRoleVariant = role => {
    if (role) return 'primary'
    return 'primary'
  }

  const resolveUserRoleIcon = role => {
    if (role) return 'UserIcon'

    return 'UserIcon'
  }

  const resolveUserStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'secondary'
    return 'primary'
  }

  return {
    fetchUsers,
    fetchRoles,
    fetchPaises,
    fetchStates,
    fetchCiudad,
    tableColumns,
    perPage,
    currentPage,
    totalUsers,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refUserListTable,
    roleOptions,
    filter,
    filterOn,
    resolveUserRoleVariant,
    resolveUserRoleIcon,
    resolveUserStatusVariant,
    refetchData,
    roleFilter,
    planFilter,
    statusFilter,
  }
}
