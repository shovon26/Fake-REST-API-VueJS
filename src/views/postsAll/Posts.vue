<template>
    <h1>Posts list</h1>
    <div class="dropdown">
        <label class="dropdownHeader">UserID</label>
        <select v-model="selectedUserId">
            <option v-for="userID in userIDS" :key="userID" v-bind:value="userID"> {{ userID }} </option>
        </select>
    </div>
    <table>
        <thead>
            <tr class="heading">
                <th>userID</th>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="post in filteredPosts" :key="post.id">
                <td>{{ post.userId }}</td>
                <td>{{ post.id }}</td>
                <td>{{ post.title }}</td>
                <td>{{ post.body }}</td>
                <nav>
                    <td> <router-link :to="{ name: 'EditPost', params: {id: post.id }}" class="editButton">Edit</router-link> 
                        <!-- <router-link :to="{ name: 'DeletePost', params: {id: post.id }}">Delete</router-link> -->
                        <button @click="deletePost(post)">Delete</button>
                    </td>
                </nav>
            </tr>
        </tbody>
    </table>

</template>

<script>
export default {
    data(){
        return {
            posts: [],
            selectedUserId: null,
            userIDS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    },
    mounted(){
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                if(!response.ok){
                    throw new Error('Please provide proper data')
                }
                return response.json()
            })
            .then(posts => this.posts = posts)
            .then(err => console.log(err.message))
    },
    computed: {
        filteredPosts() {
            if (!this.selectedUserId) {
                console.log('full posts')
                return this.posts
            }
            console.log('filtered list')
            console.log(this.posts.filter((post) => post.userId === this.selectedUserId).length)
            return this.posts.filter((post) => post.userId === this.selectedUserId)
        }
    },
    methods: {
        deletePost(post) {
            fetch('https://jsonplaceholder.typicode.com/posts/${post.id}', {
                method: "DELETE",
            })
            .then((response) => {
            if (!response.ok) {
                throw new Error("row data is not valid")
            }
            // Remove the deleted post from the posts array
            this.posts = this.posts.filter((p) => p.id !== post.id)
            })
            .catch((err) => console.log(err.message))
        }
    }
}
</script>

<style>
    .post h3 {
        background: #f4f4f4;
        padding: 20px;
        border-radius: 10px;
        margin: 10px auto;
        max-width: 600px;
        cursor: pointer;
        color: #444;
    }
    .post h3:hover {
        background: #ddd;
    }
    .post a {
        text-decoration: none;
    }
    .editButton {
        background: #0b6dff;
        border: 0;
        padding: 10px 20px;
        margin-top: 20px;
        color: white;
        border-radius: 20px;
    }
    .editButton:hover {
        background: #ddd;
    }
    nav {
        padding: 30px;
    }

    nav a {
        font-weight: bold;
        color: #2c3e50;
        text-decoration: none;
        padding: 10px;
        border-radius: 4px;
    }

    nav a.router-link-exact-active {
        color: white;
        background: crimson;
    }
    tr {
        background: #dfd991;
    }
    .heading {
        height: 40px;
        font-size: 20px;
        font: bold;
    }
    table {
        width: 100%;
        table-layout: fixed;
    }

    th,
    td {
        width: 20%;
    }
    button {
        font: bold;
        font-size: 15px;
    }
    label.dropdownHeader {
        font-size: large;
        color: #250c0c;
    }
    .dropdown {
        width: 20%;
    }

</style>