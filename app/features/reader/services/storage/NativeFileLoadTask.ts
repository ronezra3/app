declare var fileCrypto:any;

/*@ngInject*/
export function NativeFileLoadTask(lodash, $q) {
  var nativeQueue = {

    _priority: [],
    _tasks: [],
    _current: null,

    _doneProxy: function (data) {
      nativeQueue._current.done(data);
      nativeQueue._current = null;

      nativeQueue._dispatchNext();
    },

    _errorProxy: function (error) {
      nativeQueue._current.error(error);
      nativeQueue._current = null;

      nativeQueue._dispatchNext();
    },


    _isEmpty: function () {
      return lodash.isEmpty(nativeQueue._priority) && lodash.isEmpty(nativeQueue._tasks);
    },

    _dequeue: function () {
      if (lodash.isEmpty(nativeQueue._priority))
        return nativeQueue._tasks.shift();
      else
        return nativeQueue._priority.shift();
    },

    _dispatchNext: function () {
      if (nativeQueue._current || this._isEmpty())
        return;

      var task = nativeQueue._dequeue();

      nativeQueue._current = task;
      fileCrypto.load(task.path, task.key, nativeQueue._doneProxy, nativeQueue._errorProxy);
    },

    pushPriority: function (id, path, key, done, error) {
      this.remove(id);

      nativeQueue._priority.unshift({
        id: id,
        path: path,
        key: key,
        done: (done || lodash.noop),
        error: (error || lodash.noop)
      });
      nativeQueue._dispatchNext();
    },

    push: function (id, path, key, done, error) {
      this.remove(id);

      nativeQueue._tasks.unshift({
        id: id,
        path: path,
        key: key,
        done: (done || lodash.noop),
        error: (error || lodash.noop)
      });
      nativeQueue._dispatchNext();
    },

    remove: function (id) {
      nativeQueue._tasks = lodash.filter(function (task) {
        return task['id'] !== id;
      });
      nativeQueue._priority = lodash.filter(function (task) {
        return task['id'] !== id;
      });
    }
  };


  function NativeFileLoadTask(fileEntry, key) {
    this._id = lodash.uniqueId('task');
    this._key = key;
    this._path = fileEntry.nativeURL;

    this._progress = $q.defer();
    this._done = false;

    lodash.bindAll(this, 'load', 'lowPriorityLoad', '_resolve', '_reject', 'pause');
  }


  NativeFileLoadTask.prototype._resolve = function (data) {
    if (this._done)
      return;

    this._done = true;
    this._progress.resolve(data);
  };

  NativeFileLoadTask.prototype._reject = function (error) {
    if (this._done)
      return;

    this._progress.reject(error);
  };

  NativeFileLoadTask.prototype.load = function () {
    if (!this._done)
      nativeQueue.pushPriority(this._id, this._path, this._key, this._resolve, this._reject);

    return this._progress.promise;
  };

  NativeFileLoadTask.prototype.lowPriorityLoad = function () {
    if (!this._done)
      nativeQueue.push(this._id, this._path, this._key, this._resolve, this._reject);

    return this._progress.promise;
  };

  NativeFileLoadTask.prototype.pause = function () {
    nativeQueue.remove(this._id)
  };


  return NativeFileLoadTask;
}
