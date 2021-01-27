<template>
  <div>
    <div class="row">
      <div class="two columns"><p style="color: white;">.</p></div>
      <div class="eight columns">
        <router-link :to="{ name: 'Home'}">
          <button type="button">Back</button>
        </router-link>
        <h3>Key numbers</h3>
        <p>All: {{articles.length}}</p>
        <p>Read: {{sumReadArticles}}</p>
        <p>Screen: {{sumScreenedArticles}}</p>
        <p>Included: {{sumIncludedArticles}}</p>
        <h3># by year</h3>
        <line-chart :data="[{name: 'all', data: statistics.all},
          {name: 'included', data: statistics.include},
          {name: 'not screened', data: statistics.notScreened}]"></line-chart>
        <h3># of included by year</h3>
        <column-chart :data=statistics.include></column-chart>
        <h3># of all by year</h3>
        <column-chart :data=statistics.all></column-chart>
        <h3>Question statistics</h3>
        <div v-for="(question, index) in questionsData" :key="index">
          <p>{{index}}</p>
          <pie-chart
          :data="[['yes', question], ['No', (sumReadArticles - question)]]"></pie-chart>
        </div>
      </div>
      <div class="two columns"></div>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:7777/api/articles';

export default {
  name: 'Statistics',
  data: () => ({
    error: '',
    articles: [],
    years: [],
    filter: 'NotScreened',
    statistics: {},
    questionsData: {},
  }),
  mounted() {
    fetch(API_URL).then((response) => response.json()).then((result) => {
      this.articles = result;

      this.statistics = this.articles
        .reduce((array, currentValue) => {
          const r = array;
          if (currentValue.year) {
            if (!r.all[currentValue.year]) {
              r.all[currentValue.year] = 0;
            }
            r.all[currentValue.year] += 1;
          }
          if (currentValue.include === true) {
            if (currentValue.year) {
              if (!r.include[currentValue.year]) {
                r.include[currentValue.year] = 0;
              }
              r.include[currentValue.year] += 1;
            }
          }
          if (currentValue.screened === false) {
            if (currentValue.year) {
              if (!r.notScreened[currentValue.year]) {
                r.notScreened[currentValue.year] = 0;
              }
              r.notScreened[currentValue.year] += 1;
            }
          }
          return r;
        }, { include: {}, all: {}, notScreened: {} });

      this.questionsData = this.articles
        .filter((article) => (article.include === true && article.read === true))
        .reduce((array, currentValue) => {
          const r = array;
          currentValue.questions.forEach((question) => {
            if (!r[question.text]) {
              r[question.text] = 0;
            }
            if (question.answer === true) {
              r[question.text] += 1;
            }
          });
          return r;
        }, {});
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
      // console.log('Do not filter');
      return this.articles;
    },
    sumReadArticles() {
      return this.articles.filter((article) => article.read === true).length;
    },
    sumScreenedArticles() {
      return this.articles.filter((article) => article.screened === true).length;
    },
    sumIncludedArticles() {
      return this.articles.filter((article) => article.include === true).length;
    },
    // duplicateEntries() {
    //   return this.duplicates.filter((article) => article.value > 1);
    // },
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
