<template>
    <div class="container mt-3 mt-sm-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="white-wrapper">
                    <h3 class="mb-4">Pridať Otázku</h3>
                    <form id="form" method="POST" @submit="validateForm">
                        <div class="form-group">
                            <label class="form-control-label" for="new_question_title">Názov</label>
                            <input id="new_question_title" name="name_question" class="form-control form-control-warning" v-bind:class="{ 'has-warning': attemptSubmit && missingQuestionName || addExistedQuestion }"  type="text" v-model="name">
                            <div class="form-control-feedback" v-if="attemptSubmit && missingQuestionName">Vyplňte prosím toto políčko</div>
                            <div class="form-control-feedback" v-if="attemptSubmit && addExistedQuestion">Otázka s takýmto názvom už existuje</div>
                        </div><!-- /form-group -->
                        <div class="form-group">
                            <label class="form-control-label" for="new_question_answer_a">Odpoveď A</label>
                            <input id="new_question_answer_a" name="question_answer_a" class="form-control form-control-warning" v-bind:class="{ 'has-warning': attemptSubmit && missingQuestionAnswerA }"  type="text" v-model="answer_a">
                            <div class="form-control-feedback" v-if="attemptSubmit && missingQuestionAnswerA">Vyplňte prosím toto políčko</div>
                        </div><!-- /form-group -->
                        <div class="form-group">
                            <label class="form-control-label" for="new_question_answer_b">Odpoveď B</label>
                            <input id="new_question_answer_b" name="question_answer_a" class="form-control form-control-warning" v-bind:class="{ 'has-warning': attemptSubmit && missingQuestionAnswerB }"  type="text" v-model="answer_b">
                            <div class="form-control-feedback" v-if="attemptSubmit && missingQuestionAnswerB">Vyplňte prosím toto políčko</div>
                        </div><!-- /form-group -->
                        <div class="form-group">
                            <label class="form-control-label" for="new_question_answer_c">Odpoveď C</label>
                            <input id="new_question_answer_c" name="question_answer_a" class="form-control form-control-warning" v-bind:class="{ 'has-warning': attemptSubmit && missingQuestionAnswerC }"  type="text" v-model="answer_c">
                            <div class="form-control-feedback" v-if="attemptSubmit && missingQuestionAnswerC">Vyplňte prosím toto políčko</div>
                        </div><!-- /form-group -->
                        <div class="form-group">
                            <label class="form-control-label" for="new_question_answer_d">Odpoveď D</label>
                            <input id="new_question_answer_d" name="question_answer_a" class="form-control form-control-warning" v-bind:class="{ 'has-warning': attemptSubmit && missingQuestionAnswerD }"  type="text" v-model="answer_d">
                            <div class="form-control-feedback" v-if="attemptSubmit && missingQuestionAnswerD">Vyplňte prosím toto políčko</div>
                        </div><!-- /form-group -->
                        <div class="form-group">
                            <label>Správna odpoveď</label>
                            <select id="right_answer_select" class="form-control form-control-warning" v-bind:class="{ 'has-warning': attemptSubmit && missingRightAnswer }"  v-model="rightAnswer">
                                <option value="">Vybrať správnu odpoveď</option>
                                <option value="answer_a">Odpoveď A</option>
                                <option value="answer_b">Odpoveď B</option>
                                <option value="answer_c">Odpoveď C</option>
                                <option value="answer_d">Odpoveď D</option>
                            </select>
                            <div class="form-control-feedback" v-if="attemptSubmit && missingRightAnswer">Vyberte prosím správnu odpoveď pre danú otázku</div>
                        </div>
                        <div class="form-group">
                            <label>Kategória</label>
                            <select id="question_selected_category" class="form-control form-control-warning" v-bind:class="{ 'has-warning': attemptSubmit && missingSelectedCategory }"  v-model="selectedCategory">
                                <option value="">Vyberte príslušnú kategóriu</option>
                                <option v-for="category in jsonAllCategories" :value="category.slug">{{category.name}}</option>
                            </select>
                            <div class="form-control-feedback" v-if="attemptSubmit && missingSelectedCategory">Priradte prosím príslušnú kategóriu k danej otázke</div>
                        </div>
                        <button  id="submit_new_question_button" class="btn btn-small btn-primary" data-toggle="modal" data-target="">Pridať otázku</button>
                    </form>
                    <div class="modal fade" id="staticBackdropQuestion" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <p class="m-0">Otázka bola úspešne pridaná</p>
                                </div>
                                <div class="modal-footer justify-content-start">
                                    <span>Chcete pridať ďaľšiu otázku?</span>
                                    <button type="button" @click="GoToHomepage" class="btn btn-secondary">Nie</button>
                                    <button type="button" @click="ReloadCurrentPage" class="btn btn-primary">Áno</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- /col -->
        </div><!-- /row -->
    </div><!-- /container -->
</template>

<script>

    export default {
        data() {
            return {
                name: '',
                answer_a: '',
                answer_b: '',
                answer_c: '',
                answer_d: '',
                jsonAllQuestions: window.allQuestions,
                jsonAllCategories: window.categories,
                rightAnswer:'',
                matchExistedQuestionName: false,
                selectedCategory:'',
                attemptSubmit: false,
            }
        },
        computed: {
            addExistedQuestion: function() {
                this.matchExistedQuestionName = false;
                for(let i = 0; i < this.jsonAllQuestions.length; i++) {
                    if(this.name === this.jsonAllQuestions[i].post_title) {
                        this.matchExistedQuestionName = true;
                    }
                }

                switch (this.matchExistedQuestionName) {
                    case true: return true;
                    case false: return false;
                }
            },
            missingQuestionName: function () { return this.name === '';},
            missingQuestionAnswerA: function () { return this.answer_a === ''; },
            missingQuestionAnswerB: function () { return this.answer_b === ''; },
            missingQuestionAnswerC: function () { return this.answer_c === ''; },
            missingQuestionAnswerD: function () { return this.answer_d === ''; },
            missingRightAnswer: function () { return this.rightAnswer === ''; },
            missingSelectedCategory: function () { return this.selectedCategory === ''; }
        },
        methods: {
            GoToHomepage() {
                window.location.href = '/';
            },
            ReloadCurrentPage() {
                location.reload();
            },
            validateForm(event) {
                this.attemptSubmit = true;
                if (this.addExistedQuestion || this.missingQuestionName || this.missingQuestionAnswerA || this.missingQuestionAnswerB
                    || this.missingQuestionAnswerC || this.missingQuestionAnswerD || this.missingRightAnswer || this.missingSelectedCategory)
                {
                    event.preventDefault();
                }

                else {
                    event.preventDefault();
                    let title = document.getElementById('new_question_title').value;
                    let answer_a = document.getElementById('new_question_answer_a').value;
                    let answer_b = document.getElementById('new_question_answer_b').value;
                    let answer_c = document.getElementById('new_question_answer_c').value;
                    let answer_d = document.getElementById('new_question_answer_d').value;

                    // get right answer option from select box
                    let selector = document.getElementById('right_answer_select');
                    let value = selector[selector.selectedIndex].value;
                    let right_answer;

                    switch (value) {
                        case 'answer_a': right_answer = answer_a; break;
                        case 'answer_b': right_answer = answer_b; break;
                        case 'answer_c': right_answer = answer_c; break;
                        case 'answer_d': right_answer = answer_d; break;
                    }

                    // get option Category from select box
                    let category = document.getElementById('question_selected_category');
                    let selected_category = category[category.selectedIndex].value;

                    document.getElementById('submit_new_question_button').dataset.target = "#staticBackdropQuestion";
                    document.getElementById('submit_new_question_button').click();

                    // if input fields are not empty!
                    $.ajax({
                        url: ajaxurl,
                        type: "POST",
                        data:
                            {
                                "action": "addNewQuestion",
                                "name":title, "answer_a":answer_a, "answer_b":answer_b, "answer_c":answer_c, "answer_d":answer_d, "right_answer":right_answer, "category": selected_category
                            },
                        success:function(data) {
                            // backOfferButton.dataset.target = "/";
                        }
                    });
                }
            },
        },
    }
</script>
