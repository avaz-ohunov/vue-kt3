<template>
    <div>
      <div v-for="post in postsStore.posts" :key="post.id" class="post">
        <div class="post_field">
          <p>{{ post.title }}</p>
          <hr>
          <div class="post_bottom">
            <Button
              @click="toggleComments(post)"
              :title="post.showComments ? 'Спрятать' : 'Комментарии'"
              size="sm"
              color="blue"
            >
            </Button>
            <p>Количество комментариев: {{ post.comments.length }}</p>
            <Button
              @click="postsStore.openModal(post)"
              title="Изменить"
              size="sm"
              color="blue"
            />
            <Button
              @click="postsStore.deletePost(post.id)"
              title="Удалить"
              size="sm"
              color="red"
            />
          </div>
          <div v-if="post.showComments">
            <div v-for="comment in post.comments" :key="comment.id" class="comment_text">
              <p>{{ comment.text }}</p>
            </div>
            <div class="comment_field">
              <textarea v-model="newComment" placeholder="Введите комментарий" class="comment_input"></textarea>
              <Button
                @click="addComment(post)"
                title="Добавить"
                size="sm"
                color="blue"
              />
            </div>
          </div>
        </div>
      </div>
    
      <div class="modal-overlay" v-show="postsStore.isModalOpen" @click="postsStore.closeModal">
        <div class="modal-content" @click.stop>
          <div class="comment_field">
            <div class="comment_text">
              <textarea v-model="postsStore.input_post" placeholder="Введите новый заголовок" class="comment_input"></textarea>
            </div>
            <div class="modal-buttons">
              <Button
                @click="postsStore.changePost"
                title="Подтвердить"
                size="sm"
                color="blue"
              />
              <Button
                @click="postsStore.closeModal"
                title="Закрыть"
                size="sm"
                color="red"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePostsStore } from '../stores/posts';
import Button from './UI/Button.vue'; 

const postsStore = usePostsStore();
const newComment = ref('');

const toggleComments = (post) => {
  post.showComments = !post.showComments; 
};

const addComment = (post) => {
  if (newComment.value.trim()) {
    postsStore.addComment(post.id, newComment.value);
    newComment.value = '';
  }
};
</script>
  
<style scoped>

.post_field {
  background-color: #F8F9FA;
  width: 800px;
  border-radius: 20px;
  border: 2px solid #0094FF;
  margin: 15px;
  padding: 15px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.post_field:hover {
  transform: translateY(-3px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}

.post {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
}

.post_bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.modal-overlay {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(108, 158, 255, 0.59);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 80%;
  max-width: 751px;
  background-color: #FCFBFB;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
}

.comment_field {
  background-color: #F8F9FA;
  border-radius: 20px;
  padding: 15px;
}

.comment_text {
  background-color: #FFFFFF;
  border: 1px solid #CED4DA;
  border-radius: 15px;
  padding: 15px;
  margin: 10px 0;
  transition: transform 0.2s;
}

.comment_text:hover {
  transform: scale(1.02);
}

.comment_input {
  width: 100%; 
  height: 120px;
  border: none;
  border-radius: 10px; 
  padding: 10px; 
  resize: none; 
  font-size: 24px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment_input:focus {
  outline: none;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  margin-top: 10px;
}

</style>
  
  