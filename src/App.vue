<template>
    <div>
        <div>
            <div v-if="!loading.list">
                <h3>Here is a list of all the users</h3>
                <table>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.first_name }}</td>
                        <td>{{ user.last_name }}</td>
                        <td>
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
            <form @submit.prevent="submitUser" v-if="!loading.form">
                <div>
                    <label for="first_name"> First name </label>
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
                    <input type="text" id="email" v-model="form.email" />
                </div>
                <button type="submit">Create user</button>
            </form>
            <p v-else>Loading...</p>
        </div>
        <div>
            <h3>Highlighted user</h3>

            <span v-if="highlightedUser == null && !loading.highlight"
                >No highlighted user</span
            >

            <div v-else-if="!loading.highlight">
                <div v-for="(field, key) in highlightedUser" :key="field">
                    <span v-if="key !== 'avatar'">
                        <strong>{{ key }}:</strong> {{ field }}
                    </span>
                    <span v-else>
                        <img :src="field" />
                    </span>
                </div>
            </div>
            <p v-else>Loading...</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
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

    mounted() {
        this.resetForm();
        this.fetchUsers();
    },

    methods: {
        async fetchUsers() {
            this.loading.list = true;
            let { data } = await this.$http.get("users?per_page=100&delay=1");

            this.users = data.data;
            this.loading.list = false;
        },
        async submitUser() {
            this.loading.form = true;
            let { data } = await this.$http.post("users?delay=1", this.form);
            this.resetForm();
            this.users.push(data);
            this.loading.form = false;
        },
        async highlightUser(userId) {
            this.loading.highlight = true;
            let { data } = await this.$http.get("users/" + userId + "?delay=1");
            this.highlightedUser = data.data;
            this.loading.highlight = false;
        },
        resetForm() {
            this.form = {
                first_name: null,
                last_name: null,
                email: null,
            };
        },
    },
};
</script>

<!--<style>
@import "~bootstrap/dist/css/bootstrap.css";
</style>-->
