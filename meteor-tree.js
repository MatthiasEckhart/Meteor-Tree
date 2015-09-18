if (Meteor.isClient) {
    Template.getElements.helpers({
        children: function () {
            return Articles.find({parent: this._id});
        },
        hasChildren: function () {
            return Articles.find({parent: this._id}).count() > 0;
        }
    });

    Template.editor.helpers({
        section: function () {
            return Articles.find({title: "Article"});
        }
    });
}

Articles = new Mongo.Collection("articles");

if (Meteor.isServer) {
    Meteor.startup(function () {
        Articles.insert({"title": "Article"}, function (err1, id1) {
            Articles.insert({
                "title": "Category 1",
                "parent": id1
            }, function (err2, id2) {
                Articles.insert({
                    "title": "Element 1",
                    "parent": id2
                });
                Articles.insert({
                    "title": "Group",
                    "parent": id2
                }, function (err3, id3) {
                    Articles.insert({
                        "title": "Element 2",
                        "parent": id3
                    });
                });
            });
        });
    });
}
