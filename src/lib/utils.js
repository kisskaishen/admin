/**
 Vue插件，用来获取和设置localStorage存储
 */
let local = {
    save(key, value) {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        localStorage.setItem(key, value)
    },
    fetch(key) {
        return JSON.parse(localStorage.getItem(key)) || {}
    }
}

let session = {
    save(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value))
    },
    fetch(key) {
        return JSON.parse(sessionStorage.getItem(key)) || {}
    }
}

export default {
    install: function (vm) {
        vm.prototype.$local = local
        vm.prototype.$session = session
    }
}
