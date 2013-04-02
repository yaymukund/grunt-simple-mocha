describe('ex1', function() {
  it('works sync', function() {
  });
  it('works fake async', function(done) {
    done();
  });
  it('works fake async', function(done) {
    setTimeout(function() {
      done();
    });
  });
});
