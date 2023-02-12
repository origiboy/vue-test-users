<template>
  <div class="flex popup-wrapper">
    <div class="flex popup">
      <div class="flex popup__header">
        <h2>Добавление пользователя</h2>
        <button class="popup__close"
          @click="$emit('handlerClick')"
        >
          <svg width="100%" height="100%" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2.09082" width="29.5699" height="2.95699" transform="rotate(45 2.09082 0)" fill="#333333"/>
            <rect y="20.9092" width="29.5699" height="2.95699" transform="rotate(-45 0 20.9092)" fill="#333333"/>
          </svg>
        </button>
      </div>

      <form action="" class="flex popup__form"
        @submit.prevent="handleSubmit"
      >
        <label class="flex">
          <span class="popup__field-name">Имя</span>
          <div class="flex popup__field">
            <input type="text" name="" id=""
              v-model="name">
              <span class="invalid-feedback"
              :class="nameField"
            >
              Это обязательное поле
            </span>
          </div>
        </label>

        <label class="flex">
          <span class="popup__field-name">Телефон</span>
          <div class="flex popup__field">
            <input type="text" name="" id=""
              v-model="phoneNumber">
              <span class="invalid-feedback"
              :class="phoneNumberField"
            >
              Это обязательное поле
            </span>
          </div>
        </label>

        <label class="flex">
          <span class="popup__field-name">Начальник</span>
          <div class="flex popup__field">
            <select name="chief" id=""
              v-model="chief">
                <option value="no-chief" selected="selected">Без начальника</option>
                <option
                  v-for="value in $root.$data.state.users"
                  :value="value.id"
                  :key="value.id"
                >
                  {{ value.name }}
                </option>
            </select>
            <span class="invalid-feedback"
              :class="chiefField"
            >
              Это обязательное поле
            </span>
          </div>
        </label>

        <div>
          <Save />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import Save from '../Buttons/Add.vue'

export default {
  name: 'Form',
  components: {
    Save,
  },
  data () {
    return {
      name: null,
      phoneNumber: null,
      chief: 'no-chief',
      submitted: false,
    }
  },
  validations: {
    name: { required },
    phoneNumber: { required },
    chief: { required },
  },
  methods: {
    handleSubmit () {
      this.submitted = true
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.chief === 'no-chief') {
          this.chief = null
        }
        this.$root.$data.addNewUser({name: this.name, phoneNumber: this.phoneNumber, chiefId: this.chief})

        this.name = null
        this.phoneNumber = null
        this.chief = 'no-chief'
        this.submitted = false
        this.$emit('handlerClick')
      }
    },
  },
  computed: {
    nameField () {
      return {
        'invalid-feedback_active': this.submitted && !this.$v.name.required,
      }
    },
    phoneNumberField () {
      return {
        'invalid-feedback_active': this.submitted && !this.$v.phoneNumber.required,
      }
    },
    chiefField () {
      return {
        'invalid-feedback_active': this.submitted && !this.$v.chief.required,
      }
    },
  },
  watch: {
    phoneNumber (newNum, oldNum) {
      if (this.phoneNumber.length !== 0) {
        if (!(/^[0-9+() -]\d*/.test(this.phoneNumber[this.phoneNumber.length - 1]))) {
          this.phoneNumber = oldNum
        }
      }
    },
  },
}

</script>
