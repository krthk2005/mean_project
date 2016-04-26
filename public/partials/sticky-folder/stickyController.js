angular.module('stickyModule', []).
controller('stickyCtrl', ['$scope', 'LocalUserData', 'services', 'AuthService',
    function($scope, localData, services, userAuth) {

        if (localData.user.stickyNote != undefined && localData.user.stickyNote.length > 1) {
            $scope.stickyList = localData.user.stickyNote;
        }
        else {
            $scope.stickyList = [{
                "description": "store",
                "style": "top: 100px; left: 140px;",
                "color": "sticky-orange"
            }, {
                "description": "your",
                "style": "top: 200px; left: 240px;",
                "color": "sticky-blue"
            }, {
                "description": "note",
                "style": "top: 300px; left: 340px;",
                "color": "sticky-yellow"
            }, {
                "description": "here",
                "style": "top: 400px; left: 440px;",
                "color": "sticky-green"
            }]
        }
        $scope.updateSticky = function(stickyList) {
            angular.forEach($scope.stickyList, function(sticky, i) {
                sticky.style = $("#sticky" + i)[0].style.cssText;
            });
            localData.user.stickyNote = $scope.stickyList;
            services.submitTodos(stickyList).then(function(response) {
                alert("data updated successfully")
            }, function(error, status, headers, config) {
                alert(error.statusText);
            });
        }


        setTimeout(runSticky, 400);

        function runSticky() {
            $(function() {
                    // sticky note behavior can be decomposed into independent, re-usable features.
                    // some of it we get for free from jquery UI, the rest we provide here.
                    // stretchy plugin allows you to have a resizable div with a textarea inside it
                    $.fn.stretchy = function() {
                            $(this).each(function() {
                                var stretchy = this;
                                $(this).children('textarea').css({
                                    overflow: 'hidden'
                                }).keyup(function() {
                                    // configure the content proxy to be exactly like this textarea
                                    $('#content-proxy').html($(this).val().replace(/\n/g, '<br>')).width($(this).width());
                                    // we can now read the computed height off the proxy
                                    var contentHeight = $('#content-proxy').height();
                                    // auto-expand, leaving room for a blank line at the bottom
                                    if (contentHeight + 40 > $(stretchy).height()) {
                                        $(stretchy).height(contentHeight + 40);
                                    }
                                    // IE doesn't respect height: 100% on textareas 
                                    // if (jQuery.browser.msie) $(this).height(contentHeight + 40);
                                });
                                // if (jQuery.browser.msie) {
                                $(this).children('textarea').height($(this).height()) // var resizeHandlerId;
                                $(stretchy).bind('resize', function() {
                                    $(stretchy).children('textarea').height($(stretchy).height() - 10);
                                    /*
                                        clearTimeout(resizeHandlerId);
                                        resizeHandlerId = setTimeout(function() {
                                        }, 50);
                                        */
                                });
                                // }
                            });
                            return this;
                        }
                        // the stack plugin manages the zIndexes of a set of partially overlapping
                        // divs. Clicking on any element in the set brings it to the front while
                        // preserving the relative order of all others.
                    $.fn.stack = function(selector, zIndex) {
                            zIndex = zIndex || 0;
                            // compactify all zIndexes in the managed set
                            function compactifyZIndexes() {
                                $(selector).sort(function(a, b) {
                                    // first sort the elements by zIndex...
                                    var az = parseInt(a.style.zIndex) || 0;
                                    var bz = parseInt(b.style.zIndex) || 0;
                                    if (az === bz) return 0;
                                    else if (az < bz) return -1;
                                    else return 1;
                                }).each(function(i) {
                                    // then assign sequential zIndexes to them.
                                    this.style.zIndex = zIndex + i * 10;
                                });
                            }
                            // each time an managed element is clicked, bring it
                            // to the top and re-compactify all zIndexes.
                            $(this).mousedown(function() {
                                this.style.zIndex = 9999999;
                                compactifyZIndexes();
                            });
                            // compactify right away, too.
                            compactifyZIndexes();
                        }
                        // Functionally, a sticky note is simply a stacked, stretchy,
                        // draggable, and resizable element containing a textarea. 
                    $('.sticky').draggable({
                        zIndex: 2000,
                        containment: '#mainStickyLayout'
                    }).resizable({
                        handles: 'all',
                        minHeight: 90,
                        minWidth: 100
                    }).stretchy().stack('.sticky', 100);
                }

            );
            // this is a fix for jQuery's select-while-dragging bug in Chrome: http://bugs.jqueryui.com/ticket/4163
            document.onselectstart = function() {
                return false;
            }
        }

    }
])
