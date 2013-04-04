// Generated by CoffeeScript 1.4.0
(function() {
  var attribSel, emailDomains, emailNames, emailTLD, firstNames, genEmail, genName, lastNames, lorem, n, randChoice;

  firstNames = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy"];

  lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson"];

  emailNames = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = firstNames.length; _i < _len; _i++) {
      n = firstNames[_i];
      _results.push(n.toLowerCase());
    }
    return _results;
  })();

  emailDomains = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = lastNames.length; _i < _len; _i++) {
      n = lastNames[_i];
      _results.push(n.toLowerCase());
    }
    return _results;
  })();

  emailTLD = ["org", "com", "net"];

  lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel velit et massa\nultricies viverra et eget nunc. Donec laoreet hendrerit sapien, eget rutrum\nlectus posuere vitae. Proin lobortis rhoncus enim, nec faucibus augue pharetra\nvel. Donec at nisi ligula, at gravida dui. Nulla sed sapien turpis, quis ornare\nnibh. Duis lacinia, leo non vehicula dapibus, nulla orci eleifend ligula, a\nmolestie sapien odio et nisi. Pellentesque vel ligula sem. Maecenas auctor\nconsectetur convallis.";

  randChoice = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  genName = function() {
    return "" + (randChoice(firstNames)) + " " + (randChoice(lastNames));
  };

  genEmail = function() {
    return "" + (randChoice(emailNames)) + "@" + (randChoice(emailDomains)) + "." + (randChoice(emailTLD));
  };

  attribSel = function($sel, attr) {
    attr = "[" + attr + "]";
    if ($sel.is(attr)) {
      $sel.add($sel.find(attr));
    } else {
      $sel = $sel.find(attr);
    }
    return $sel;
  };

  $.fn.datamock = function() {
    return $(this).each(function() {
      var $this;
      $this = $(this);
      $(attribSel($this, 'data-mock-clone').get().reverse()).each(function() {
        var $el, $last, $parent, clone, i, init, start, _i, _ref, _results;
        $el = $(this);
        clone = parseInt($el.data('mock-clone'), 10);
        $parent = $el.parent();
        $last = $el.siblings('[data-mock-id]').last();
        if ($last.size() === 1) {
          if ($el.data('mock-clone-fixed')) {
            return;
          }
          start = parseInt($last.data('mock-id'), 10);
          init = false;
        } else {
          start = 1;
          init = true;
        }
        if (init) {
          $el.attr('data-mock-id', start);
        }
        start++;
        _results = [];
        for (i = _i = start, _ref = start + clone - (init != null ? init : {
          1: 0
        }); start <= _ref ? _i < _ref : _i > _ref; i = start <= _ref ? ++_i : --_i) {
          _results.push($parent.append($el.clone().attr('data-mock-id', i).removeAttr('data-mock-clone')));
        }
        return _results;
      });
      attribSel($this, 'data-mock').each(function() {
        var $el, mockId, text;
        $el = $(this);
        mockId = $el.closest('[data-mock-id]').data('mock-id');
        switch ($el.data('mock')) {
          case 'id':
            text = mockId;
            break;
          case 'name':
            text = genName();
            break;
          case 'email':
            text = genEmail();
            break;
          case 'lorem':
            text = lorem;
        }
        $el.text(text);
        if (mockId > 1) {
          return $el.removeAttr('data-mock');
        }
      });
      attribSel($this, 'data-mock-choices').each(function() {
        var $el;
        $el = $(this);
        $el.text(randChoice($el.data('mock-choices').split(',')));
        if ($el.closest('[data-mock-id]').data('mock-id') > 1) {
          return $el.removeAttr('data-mock-choices');
        }
      });
      return attribSel($this, 'data-mock-choice').show().each(function() {
        var $choice, $choices, $el, $siblings, choiceSel;
        $el = $(this);
        if ($el.is(':visible')) {
          choiceSel = "[data-mock-choice='" + ($el.data('mock-choice')) + "']:visible";
          $siblings = $el.siblings(choiceSel);
          if ($siblings.size() > 0) {
            $choices = $el.add($siblings);
            $choice = $(randChoice($choices.get()));
            $choice.siblings(choiceSel).hide();
          }
        }
        if ($el.closest('[data-mock-id]').data('mock-id') > 1) {
          return $el.removeAttr('data-mock-choice');
        }
      });
    });
  };

}).call(this);
