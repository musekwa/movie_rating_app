
<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field label="Name" v-model="fullname" required></v-text-field>
    <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
    <v-text-field label="Password" v-model="password" required></v-text-field>
    <v-text-field name="input-7-1" label="Confirm Password" v-model="confirm_password"></v-text-field>
    <v-btn @click="submit" :disabled="!valid">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>
<script>
import axios from 'axios'

export default ({
  data: ()=>({
    valid: true,
    fullname: '',
    email: '',
    password: '',
    confirm_password: '',
    fullnameRules: [
      (v) => !!v || 'Fullname is required'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      (v) => !!v || 'Password is required'
    ],
  }),
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            fullname: this.fullname,
            email: this.email,
            password: this.password,
          },
          url: '/users/register',
          headers: {
            'Content-Type': 'application/json',
          }
        }).then((response)=>{
          this.$swal('Great!', 'You have been successfully registered!', 'success')
          this.$router.push({ name: 'Home' })
        }).catch((error)=>{
          const message = error.response.data.message
          this.$swal('Oh oo!', `${message}`, 'error')
        })
      }
    },
    clear() {
      this.$refs.form.reset()
    },
  }
})
</script>
