;(function (ns) {
  'use strict';
  var templates = {};
  ns.Homepage = Backbone.View.extend({
    events: {
      'click .add-button': 'addButton_clickHandler'
    },
    initialize: function (options) {
      this.$('script').parent().each(function (i) {
        templates[this.id] = Handlebars.compile($(this).find('script').html());
        this.innerHTML = '';
      });
      
      this.collection = options.source.getWeek();
      this.collection.on('change', this.collection_changeHandler, this);
      this.model.on('change', this.model_changeHandler, this);
      this.render();
      this.createAddButton();
    },
    render: function () {
      this.renderSummary();
      this.renderWeek();
    },
    createAddButton: function () {
      this.addButton = this.$('.add-button').remove();
      this.$('.today .level-0').first().append(this.addButton);
    },
    renderSummary: function () {
      this.$('#summary').html(templates.summary(this.model.toJSON()));
    },
    renderWeek: function () {
      var data = {weekdays: this.collection.toJSON()};
      this.$('#detail').html(templates.detail(data));
      this.$('#week').html(templates.week(data));
    },
    addButton_clickHandler: function (event) {
      $('#select');
    },
    collection_changeHandler: function (model) {
      this.renderWeek();
    },
    model_changeHandler: function (model) {
      this.renderSummary();
    }
  });
})(GF.view)

