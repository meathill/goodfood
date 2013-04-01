;(function (ns) {
  'use strict';
  var templates = {};
  ns.Homepage = Backbone.View.extend({
    events: {
      'tap .add-button': 'addButton_tapHandler'
    },
    initialize: function (options) {
      this.$('script').parent().each(function (i) {
        templates[this.id] = Handlebars.compile($(this).find('script').html());
        this.el.innerHTML = '';
      });
      
      this.collection = options.source.getWeek();
      this.collection.on('change:f1 change:f2 change:f3', this.collection_changeHandler, this);
      this.collection.on('change:level', this.collectionLevel_changeHandler, this);
      this.model.on('change', this.model_changeHandler, this);
      this.render();
      this.createAddButton();
    },
    render: function () {
      this.$('#summary').html(templates.summary(this.model.toJSON()));
      
      var foods = {weekdays: this.collection.toJSON()};
      this.$('#detail').html(templates.detail(foods));
      this.$('#week').html(templates.week(foods));
    },
    createAddButton: function () {
      this.addButton = this.$('.add-button').remove();
      this.$('.today .level-0').first().append(this.addButton);
    },
    renderSummary: function () {
      this.$('#summary').html(templates.summary(this.model.toJSON()));
    },
    renderFood: function (model, value) {
      var data = {weekdays: model.toJSON()};
      this.$('#detail').children().eq(this.collection.indexOf(model)).replaceWith(templates.detail(data));
    },
    renderDays: function (model, value) {
      var data = {level: value};
      this.$('#week').children().eq(this.collection.indexOf(model)).replaceWith(templates.week(data));
    },
    addButton_tapHandler: function (event) {
      var day = this.$('.today').index(),
          index = this.$('.today .level-0').index();
      GF.popup.Manager.showSelectPopup(this.collection.at(day), index);
    },
    collection_changeHandler: function (model) {
      this.renderWeek();
    },
    model_changeHandler: function (model) {
      this.renderSummary();
    }
  });
})(GF.view)

