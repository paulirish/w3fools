function check_links()
{               
  $('a.l').each(function () {             
    port.postMessage({ should_filter: $(this).attr('href') });
  });                     
};               

function stop_timer()
{  
  clearInterval(check_links_timer);      
}            

var port = chrome.extension.connect({name: "knockknock"});
port.onMessage.addListener(function(response) {
  var result_a = $('a.l[href="' + response.href.replace('"', '\\"') + '"]'); 
  switch (response.action)
  {
    case 'hide':
      result_a.parent().parent().parent().hide();
      break;
    case 'amplify':                  
      if (!result_a.parent().parent().parent().hasClass('amplified_result'))
      {
        result_a.parent().parent().parent().addClass('amplified_result');
      }
      break;
    default:
      result_a.parent().parent().parent().show();
      result_a.parent().parent().parent().removeClass('amplified_result');
      break;
  }              
});
                   
if (window.location.host.indexOf('www.google.') != -1 && window.location.pathname.indexOf('/reader') == -1 && window.location.pathname.indexOf('/calendar') == -1)
{     
  var check_links_timer = setInterval(check_links, 750);
}



