<template>
  <div>
     <template v-if="post"> <!-- ensuring the post is not null  -->
      <form>
        <label>User ID:</label>
        <input type="number" v-model="post.userId" />
        <label>Title:</label>
        <input type="text" v-model="post.title"/>
        <label>Body:</label>
        <input type="text" v-model="post.body"/>
    
        <div @click="editPost" class="submit">
          <button @click="redirect">Save</button>
        </div>
      </form>
    </template>
  </div>
</template>
  
  <script>
  export default {
    props: ['id'],
    data() {
      return {
        post: null
      };
    },
    mounted() {
      fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}`)
        .then((res) => res.json())
        .then((data) => (this.post = data))
        .catch((err) => console.log(err.message));
    },
    methods: {
      editPost() {
        fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...this.post }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json();
          })
          .then((post) => {
            console.log(post);
          })
          .catch((error) => {
            console.log(error);
          })
      },
      redirect(){
        this.$router.push({name: 'posts'})
      }
    },
  }
  </script>
  

<style>
    form {
        max-width: 420px;
        margin: 30px auto;
        background: white;
        text-align: left;
        font-size: 25px;
        padding: 40px;
        border-radius: 10px;
    }
    label {
        color: #aaa;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
    }
    input, select {
        display: block;
        padding: 10px 6px;
        width: 100%;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #555;
    }
    button, .button.submit {
        background: #0b6dff;
        border: 0;
        padding: 10px 20px;
        margin-top: 20px;
        color: white;
        border-radius: 20px;
        
    }
    button:hover {
        background: #ddd;
        cursor: pointer;
    }
</style>