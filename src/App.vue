<template>
    <div>
        <div>
            <!--  Vue conditionals allow you to render certain html elements only when a condition is true -->
            <div v-if="!loading.list">
                <h3>Here is a list of all the users</h3>
                <table>
                    <!--  Vue loops let you loop over you collections and create html elements for each item.
                      You can access the individual items inside the html tag. -->
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.first_name }}</td>
                        <td>{{ user.last_name }}</td>
                        <td>
                            <!-- Add a vue method to the event listener list with a beautiful syntax.  -->
                            <button @click="highlightUser(user.id)">
                                click here
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
            <p v-else>Loading...</p>
        </div>
        <div>
            <h3>Create a new user</h3>
            <!-- @submit.prevent makes that the default html action upon submitting a form is not performed. -->
            <form @submit.prevent="submitUser" v-if="!loading.form">
                <div>
                    <label for="first_name"> First name </label>
                    <!-- Make use of vue's famous two way binding with the v-model attribute. -->
                    <input
                            type="text"
                            id="first_name"
                            v-model="form.first_name"
                    />
                </div>
                <div>
                    <label for="last_name"> Last name </label>
                    <input
                            type="text"
                            id="last_name"
                            v-model="form.last_name"
                    />
                </div>
                <div>
                    <label for="email"> Email </label>
                    <input type="text" id="email" v-model="form.email"/>
                </div>
                <button type="submit">Create user</button>
            </form>
            <p v-else>Loading...</p>
        </div>
        <div>
            <h3>Highlighted user</h3>
            <span v-if="highlightedUser == null && !loading.highlight">
                No highlighted user
            </span>
            <div v-else-if="!loading.highlight">
                <div v-for="(field, key) in highlightedUser" :key="field">
                    <span v-if="key !== 'avatar'">
                        <strong>{{ key }}:</strong> {{ field }}
                    </span>
                    <span v-else>
                        <img :src="field"/>
                    </span>
                </div>
            </div>
            <p v-else>Loading...</p>
        </div>
    </div>
</template>

<script>
  // Export the vue instance
  export default {
    data() {
      /* Each vue instance has a data element.
      The data element must be a function that returns an object,
      this allows vue to bind the data to other parts of your javascript and html.
       */
      return {
        users: [],
        form: null,
        loading: {
          list: false,
          form: false,
          highlight: false,
        },
        highlightedUser: null,
      };
    },
    /* Each vue instance has the following life cycle: beforeCreate, created, beforeMount, mounted, etc...
    Each cycle calls their respective life cycle hoke which you can you use to do your own things.
     */
    mounted() {
      this.resetForm();
      this.fetchUsers();
    },
    /* In the method element you can define all methods that you might need. You can call these methods elsewhere in the vue instance
    or directly in you html.
     */
    methods: {
      fetchUsers() {
        this.loading.list = true;
        this.$axios.get("users?per_page=100&delay=1")
          .then((response) => {
            this.users = response.data.data;
          })
          .finally(() => {
            this.loading.users = false;
          });
      },
      /* The async await syntax is recently added to the javascript language and makes your asynchronous code
       cleaner and easier to read.
       */
      async submitUser() {
        this.loading.form = true;
        let {data} = await this.$axios.post("users?delay=1", this.form);
        this.resetForm();
        this.users.push(data);
        this.loading.form = false;
      }
      ,
      async highlightUser(userId) {
        this.loading.highlight = true;
        let {data} = await this.$axios.get("users/" + userId + "?delay=1");
        this.highlightedUser = data.data;
        this.loading.highlight = false;
      }
      ,
      resetForm() {
        this.form = {
          first_name: null,
          last_name: null,
          email: null,
        };
      }
      ,
    }
    ,
  }
  ;
</script>

<!--<style>
@import "~bootstrap/dist/css/bootstrap.css";
</style>-->
