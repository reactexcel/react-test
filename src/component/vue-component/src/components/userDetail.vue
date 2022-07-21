<template>
  <div>
    <table>
        <tr v-for="(field, index) in userFields" :key="field+index">
            <td>{{field}}</td>
            <td>{{userData[field]}}</td>
        </tr>
    </table>
  </div>
</template>

<script>
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
export default {
  name: 'userDetail',
  props: {
    uid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
        userData: null,
        userFields: null
    }
  },
  watch:{
    uid(){
      this.getUserDetails();
    }
  },
  methods: {
    getUserDetails() {
        const usersDetailsRef = doc(db, "users", this.uid);
        onSnapshot(usersDetailsRef, (querySnapshot) => {
            this.userData = querySnapshot.data()
            this.userFields = Object.keys(this.userData)
        })
    },
  },
  async mounted() {
    await this.getUserDetails();
  }
}
</script>

<style>
table {
  margin-top: 2rem;
  background-color: white;
  width: 100%;
}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
td {
    padding: 5px 10px;
}
</style>