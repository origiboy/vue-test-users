export const store = {
  state: {
    users: [],
    settings: {
      filter: 'id',
      type: 'asc'
    }
  },
  usersGrouped (usersToGroup = [...this.state.users]) {
    let newUsers = []
    let newUsersTmp = []
    newUsers.push(...usersToGroup.filter((a) => a.enclosure === 0).reverse())

    let i = 1
    let indexOfParent = null
    let indexToInsert = null
    while (true) {
      newUsersTmp = usersToGroup.filter((a) => a.enclosure === i)
      if (newUsersTmp.length === 0) {
        break
      }

      for (let j = 0; j < newUsersTmp.length; j++) {
        indexOfParent = newUsersTmp[j].chiefId
        indexToInsert = newUsers.findIndex((a) => a.id === indexOfParent)
        newUsers.splice(indexToInsert + 1, 0, newUsersTmp[j])
      }
      i++
    }
    this.state.users = newUsers
    this.setDataToLocalStorage()
  },
  sortUsersByName () {
    this.state.users = [...this.state.users].sort((a, b) => {
      if (a.name < b.name) {
        return 1
      }
      if (a.name > b.name) {
        return -1
      }
      return 0
    })
  },
  sortUsersByNameDesc () {
    this.state.users.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
  },
  get sortUsersById () {
    return [...this.state.users].sort((a, b) => b.id - a.id)
  },
  addNewUser (user) {
    const userToPush = Object.assign({}, user)
    let maxIndex
    if (this.sortUsersById[0]) {
      maxIndex = this.sortUsersById[0].id
    } else {
      maxIndex = -1
    }
    userToPush.id = maxIndex + 1
    if (user.chiefId !== null) {
      userToPush.enclosure = this.state.users.find((a) => a.id === user.chiefId).enclosure + 1
    } else {
      userToPush.enclosure = 0
    }
    this.state.users.push(userToPush)
    this.setFilters(this.state.settings.filter, this.state.settings.type)
  },
  setFilters (filter, type) {
    this.state.settings.filter = filter
    this.state.settings.type = type
    if (this.state.settings.filter === 'name') {
      if (this.state.settings.type === 'asc') {
        this.sortUsersByName()
      } else {
        this.sortUsersByNameDesc()
      }
      this.usersGrouped()
    }
    this.setDataToLocalStorage()
  },
  setDataToLocalStorage () {
    localStorage.setItem('app-data-users', JSON.stringify(this.state.users))
    localStorage.setItem('app-data-settings', JSON.stringify(this.state.settings))
  },
  getDataFromLocalStorage () {
    this.state.users = JSON.parse(localStorage.getItem('app-data-users')) || []
    if (JSON.parse(localStorage.getItem('app-data-settings'))) {
      this.state.settings.filter = JSON.parse(localStorage.getItem('app-data-settings')).name || 'name'
      this.state.settings.type = JSON.parse(localStorage.getItem('app-data-settings')).type || 'asc'
    }
    this.setFilters(this.state.settings.filter, this.state.settings.type)
  }
}
