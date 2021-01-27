<template>
  <div>
    <div class="row">
      <div class="two columns"><p style="color: white;">.</p>
        <p>All: {{articles.length}}</p>
        <p>Read: {{articles.filter((article) => article.read === true).length}}</p>
        <p>Screen: {{articles.filter((article) => article.screened === true).length}}
          ({{(((articles.filter((article) => article.screened === true).length) /
          articles.length) * 100).toFixed(0) }}%)</p>
        <p>Incl.: {{articles.filter((article) => article.include === true).length}}
          ({{(((articles.filter((article) => article.include === true).length) /
          articles.length) * 100).toFixed(0)}}%)</p>
        <router-link :to="{ name: 'Statistics'}">
        <button type="button">Statistics</button>
        </router-link>
      </div>
      <div class="eight columns">
        <select v-model="filter" class="u-full-width">
          <option>NotDone</option>
          <option>Included</option>
          <option>NotScreened</option>
          <option>All</option>
          <option>Read</option>
          <option>IncludedSortCitations</option>
        </select>
        <div v-for="article in filteredArticles" :key="article._id">
          <div>
            <div v-if="article.include" class="tag-included">included</div>
            <div v-if="article.read" class="tag-read">read</div>
            <div v-if="article.screened" class="tag-screened">screened</div>
            <div>
            <h5>{{article.title}}</h5>
            <h6>{{article.year}} - {{article.authors}} - c{{article.citations}}</h6>
            <!--<p>Source: {{article.source}}</p>-->
            <p>{{article.abstract.substring(0,300)+".."}}</p>
            <router-link :to="{ name: 'Details',params: { articleId: article._id }}">
              <button type="button">Details</button>
            </router-link>
            </div>
            <hr>
          </div>
        </div>
      </div>
      <div class="two columns"></div>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:7777/api/articles';

export default {
  name: 'Home',
  data: () => ({
    error: '',
    articles: [],
    years: [],
    filter: 'NotDone',
  }),
  mounted() {
    fetch(API_URL).then((response) => response.json()).then((result) => {
      // console.log(result.sort((a, b) => a.year - b.year));
      this.articles = result;
      this.articles.sort((a, b) => a.year - b.year);
    });
  },
  computed: {
    filteredArticles() {
      if (this.filter === 'Read') {
        // console.log('Filter on READ');
        return this.articles.filter((article) => article.read === true);
      }
      if (this.filter === 'Included') {
        // console.log('Filter on INCLUDED');
        return this.articles.filter((article) => article.include === true);
      }
      if (this.filter === 'NotScreened') {
        // console.log('Filter on NotSCREENED');
        return this.articles.filter((article) => article.screened === false);
      }
      if (this.filter === 'NotDone') {
        // console.log('Filter on NotDone');
        return this.articles
          .filter((article) => (article.include === true && article.read === false));
      }
      if (this.filter === 'IncludedSortCitations') {
        // console.log('Filter on INCLUDED');
        return this.articles.filter((article) => article.include === true).sort(
          (a, b) => b.citations - a.citations,
        );
      }
      // console.log('Do not filter');
      return this.articles;
    },
  },
};
</script>

<style>
p {
  text-align: justify;
}

div.tag-included {
  width: 60px;
  display: inline;
  padding: 5px;
  background-color: #6D98BA;
  color: white;
  border-radius: 15px;
  -moz-border-radius: 15px;
}

div.tag-read {
  width: 60px;
  display: inline;
  padding: 5px;
  background-color: #D3B99F;
  color: white;
  border-radius: 15px;
  -moz-border-radius: 15px;
}

div.tag-screened {
  width: 60px;
  display: inline;
  padding: 5px;
  background-color: #C17767;
  color: white;
  border-radius: 15px;
  -moz-border-radius: 15px;
}
</style>
