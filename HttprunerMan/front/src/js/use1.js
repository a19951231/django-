function Use1(){
    var self=this;


};
Use1.prototype.run=function(){
    var self=this;
    self.allbtnEvent();

};

Use1.prototype.allbtnEvent=function(){
    var self=this;
    var xxaddbtn=$("#xxaddbtn");
    var xxdeletebtn=$("#xxdelete-btn");
    var dataaddbtn=$("#dataadd-btn");
    var datadeletebtn=$("#datadelete-btn");
    var allxxsettings=$("#allxx-settings");
    var xxsettings=$("#xx-settings");
    self.xxaddbtn.click(function(){

    });
    self.xxdeletebtn.click(function(){
    });

};

jq331(function($){
    var use=new Use1();
    use.run();
});