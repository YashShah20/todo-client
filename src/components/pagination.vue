<template>
    <div class="d-flex justify-content-center mt-3">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <button class="page-link" v-if="currentPage > 1" @click="$emit('pageChanged', currentPage - 1)">
                        Previous
                    </button>
                </li>
                <li class="page-item" v-for="page in pages">
                    <button class="page-link" :class="{ 'bg-primary text-white': isCurrentPage(page) }"
                        @click="$emit('pageChanged', page)">
                        {{ page }}
                    </button>
                </li>
                <li class="page-item">
                    <button class="page-link" v-if="currentPage < pages" @click="$emit('pageChanged', currentPage + 1)">
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
    props: ['nItems', 'notesPerPage', 'currentPage'],
    computed: {
        pages() {
            return Math.ceil(this.nItems / this.notesPerPage)
        },
    },
    methods: {
        isCurrentPage(page) {
            return page == this.currentPage
        }
    }
}

</script>
<style scoped>
button {
    outline: none;
}
</style>