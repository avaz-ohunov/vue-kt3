import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([
    {
      id: 1,
      title: "Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.",
      comments: [
        { id: 1, text: "Самый яркий комментарий в этом посте" },
        { id: 2, text: "Один из бессмысленных комментариев в этом посте" }
      ],
      showComments: false
    },
    {
      id: 2,
      title: "Краткосрочное вымышленное преломление может выполнять особую роль в пространстве главной роли игрока",
      comments: [
        { id: 1, text: "Очень научно и непонятно" },
      ],
      showComments: false
    }
  ]);

  const isModalOpen = ref(false);
  const selectedPost = ref({});
  const input_post = ref('');

  function openModal(post) {
    selectedPost.value = post;
    input_post.value = post.title; 
    isModalOpen.value = true;
  }

  function closeModal() {
    isModalOpen.value = false;
  }

  function changePost() {
    if (input_post.value.trim() !== '') {
      const postIndex = posts.value.findIndex(post => post.id === selectedPost.value.id);
      if (postIndex !== -1) {
        posts.value[postIndex].title = input_post.value; 
      }
      closeModal();
    }
  }

  function deletePost(id) {
    posts.value = posts.value.filter(el => el.id !== id);
  }

  function addPost(title) {
    posts.value.push({
      id: Date.now(),
      title: title,
      comments: [],
      showComments: false
    });
  }

  function addComment(postId, commentText) {
    const post = posts.value.find(p => p.id === postId);
    if (post) {
      post.comments.push({ id: Date.now(), text: commentText });
    }
  }

  const commentsCount = computed(() => {
    return posts.value.map(post => post.comments.length);
  });

  return {
    posts,
    isModalOpen,
    selectedPost,
    input_post,
    openModal,
    closeModal,
    changePost,
    deletePost,
    addPost,
    addComment, 
    commentsCount,
  };
});