<template>
  <div>
  <div class="row">
    <div class="two columns"><p style="color: white;">.</p></div>
    <div class="eight columns">
        <router-link :to="{ name: 'Home'}">
        <button type="button">Back</button>
        </router-link>
        <button v-on:click="save" type="button">Save</button>
        <a class="button" :href="'https://scholar.google.no/scholar?hl=en&as_sdt=0%2C5&q=' + article.year + '+' + article.title.split(' ').join('+')">
          On Google Scholar
        </a>
        <div>
          <h5>{{article.title}}</h5>
          <h6>{{article.year}} - {{article.authors}}</h6>
          <p>Type: {{article.type}}, Search Source: {{article.source}}</p>
          <p>{{article.abstract}}</p>
          <p>Citations:<input v-model="article.citations" class="u-full-width"></p>
          <div class="details">
            <label>
              <input type="checkbox" v-model="article.read">
              <span class="label-body">Read</span>
            </label>
            <label>
              <input type="checkbox" v-model="article.include">
              <span class="label-body">Included</span>
            </label>
            <label>
              <input type="checkbox" v-model="article.screened">
              <span class="label-body">Screened</span>
            </label>
          </div>
          <label for="exampleMessage">Notes</label>
          <textarea v-model="article.notes" class="u-full-width"></textarea>
          <br/>
          <button v-on:click="showQs = !showQs" type="button">Show Questions</button>
          <div v-if="showQs">
            <h5>Questions</h5>
            <div v-for="question in article.questions" :key="question._id">
              <p>{{question.text}}</p>
              <div class="row">
                <div class="two columns">
                <label class="example-send-yourself-copy">
                  <input type="checkbox" v-model="question.answer">
                  <span class="label-body">Yes/no</span>
                </label>
                </div>
                <div class="ten columns">
                  <form>
                  <textarea v-model="question.notes"
                    class="u-full-width" placeholder="Write some notes"></textarea>
                  </form>
                </div>
                <br/>
              </div>
            </div>
          </div>
          <button v-on:click="showBib = !showBib" type="button">Show BibTex</button>
          <div v-if="showBib">
            <pre><code>{{article.bibtex}}</code></pre>
          </div>
        </div>
      <button v-on:click="save" type="button">Save</button>
    </div>
    <div class="two columns">
      <small>
        <strong>Inclusion:</strong>
        <ul>
          <li>Focus is on detection control</li>
          <li>Control is used in an IACS</li>
          <li>Control is used in a CPS which is IACS-like</li>
        </ul>
        <strong>Exclusion:</strong>
        <ul>
          <li>Is a review or survey</li>
          <li>Focus is not a detection control</li>
          <li>Control is only used in normal ICT</li>
          <li>Control is only used in non-IACS-like CPS</li>
          <li>Detection is focused on faults or other physical errors</li>
        </ul>
      </small>
    </div>
  </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:7777/api/articles';

export default {
  name: 'Details',
  data: () => ({
    error: '',
    showQs: false,
    showBib: false,
    article: [],
  }),
  mounted() {
    // console.log(`${API_URL}/${this.$route.params.articleId}`);
    fetch(`${API_URL}/${this.$route.params.articleId}`)
      .then((response) => response.json()).then((result) => {
        this.article = result;
      });
  },
  methods: {
    save() {
      // console.log(this.message);
      fetch(`${API_URL}/${this.$route.params.articleId}`, {
        method: 'PUT',
        body: JSON.stringify(this.article),
        headers: {
          'content-type': 'application/json',
        },
      }).then((response) => response.json()).then((result) => {
        if (result.details) {
          // there was an error.
          const error = result.details.map((detail) => detail.message).join('. ');
          this.error = error;
        } else {
          this.error = '';
        }
      });
    },
  },
};
</script>

<style>
</style>
