;(function (ns) {
  'use strict';
  var offsetWeek = 0,
      today = 7,
      templates = {};
  ns.Homepage = Backbone.View.extend({
    events: {
      'tap #detail .level': 'level_tapHandler',
      'swipeLeft #detail,#week': 'swipeLeftHandler',
      'swipeRight #detail,#week': 'swipeRightHandler'
    },
    initialize: function () {
      this.$('script').parent().each(function (i) {
        templates[this.id] = Handlebars.compile($(this).find('script').html());
        this.innerHTML = '';
      });

      this.collection.on('change:f1 change:f2 change:f3', this.collectionFood_changeHandler, this);
      this.collection.on('change:level', this.collectionLevel_changeHandler, this);
      this.collection.on('reset', this.collection_resetHandler, this);
      this.model.on('change', this.model_changeHandler, this);

      this.render();
      this.$el.removeClass('hide');
    },
    render: function () {
      this.renderSummary();

      var foods = {weekdays: this.collection.toJSON()};
      this.$('#detail').html(templates.detail(foods));
      this.$('#week').html(templates.week(foods));
      this.createAddButton();

      today = this.$('.today');
      today = today.length > 0 ? today.index() : 7;
    },
    createAddButton: function () {
      this.addButton = this.addButton || this.$('.add-button').remove();
      this.$('.today .level-0').first().append(this.addButton);
    },
    renderSummary: function () {
      this.$('h2 .days').html(this.model.get('days') + ' 天');
      this.$('#summary').html(templates.summary(this.model.toJSON()));
    },
    renderFood: function (model) {
      var data = {weekdays: [model.toJSON()]};
      this.$('#detail').children().eq(this.collection.indexOf(model)).replaceWith(templates.detail(data));
      this.createAddButton();
    },
    renderDays: function (model, value) {
      var data = {weekdays: [{level: value}]};
      this.$('#week').children().eq(this.collection.indexOf(model)).replaceWith(templates.week(data));
    },
    collection_resetHandler: function () {
      this.render();
    },
    collectionFood_changeHandler: function (model, value) {
      this.renderFood(model);
    },
    collectionLevel_changeHandler: function (model, level) {
      this.renderDays(model, level);
    },
    level_tapHandler: function (event) {
      var target = $(event.currentTarget),
          parent = target.closest('.single-day'),
          day = parent.index(),
          index = target.index();
      if (day > today) {
        return;
      }
      target.addClass('active');
      R.router.navigate('#/popup/select/' + day + '/' + index);
    },
    model_changeHandler: function (model) {
      this.renderSummary();
    },
    swipeLeftHandler: function () {
      offsetWeek += 1;
      offsetWeek = offsetWeek > 0 ? 0 : offsetWeek;
      R.record.getWeek(offsetWeek);
    },
    swipeRightHandler: function () {
      offsetWeek -= 1;
      R.record.getWeek(offsetWeek);
    }
  });
})(GF.view);

