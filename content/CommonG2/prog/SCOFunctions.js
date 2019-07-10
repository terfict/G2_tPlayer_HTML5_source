/*******************************************************************************
** 
** Filename: Photoshop_SCOFunctions.js
**
** File Description: This file contains several JavaScript functions that are 
**                   used by the Sample SCOs contained in the Sample Course.
**                   These functions encapsulate actions that are taken when the
**                   user navigates between SCOs, or exits the Lesson.
**
** Author: ADL Technical Team
**
** Contract Number:
** Company Name: CTC
**
** Design Issues:
**
** Implementation Issues:
** Known Problems:
** Side Effects:
**
** References: ADL SCORM
**
********************************************************************************
**
** Concurrent Technologies Corporation (CTC) grants you ("Licensee") a non-
** exclusive, royalty free, license to use, modify and redistribute this
** software in source and binary code form, provided that i) this copyright
** notice and license appear on all copies of the software; and ii) Licensee
** does not utilize the software in a manner which is disparaging to CTC.
**
** This software is provided "AS IS," without a warranty of any kind.  ALL
** EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS AND WARRANTIES, INCLUDING ANY
** IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-
** INFRINGEMENT, ARE HEREBY EXCLUDED.  CTC AND ITS LICENSORS SHALL NOT BE LIABLE
** FOR ANY DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
** DISTRIBUTING THE SOFTWARE OR ITS DERIVATIVES.  IN NO EVENT WILL CTC  OR ITS
** LICENSORS BE LIABLE FOR ANY LOST REVENUE, PROFIT OR DATA, OR FOR DIRECT,
** INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE DAMAGES, HOWEVER
** CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, ARISING OUT OF THE USE OF
** OR INABILITY TO USE SOFTWARE, EVEN IF CTC  HAS BEEN ADVISED OF THE
** POSSIBILITY OF SUCH DAMAGES.
**
*******************************************************************************/
var startDate;
var exitPageStatus = false;
/*-----------*/
var initFlag;
var totalTime = 0;
var yyy = 0;  //單位：毫秒


function loadPage(){ 

  var result = doInitialize();
  exitPageStatus = false;
   
  var status = doGetValue("cmi.completion_status");
   
  // if (status != "completed"){
  //  //the student is now attempting the lesson
  //    doSetValue( "cmi.completion_status", "completed" );
  // }

  //1071206 - loadPage() 和 checkStatus() 都要擺放這兩行。session_time 和 total_time 紀錄才會出現。
  //1080128 - 隱藏。不需這兩行，一樣可以有選單項目之學習進程icon。
  // doSetValue("cmi.success_status", "passed");
  // doSetValue("cmi.completion_status", "completed");
   
   //
   startTimer();
   
}

function computeTime(){

   if ( startDate != 0 ){
      var currentDate = new Date().getTime();
      var elapsedSeconds = Math.round(( (currentDate - startDate) / 1000 ));
      var formattedTime = centisecsToISODuration( (elapsedSeconds*100) ,false);

   }else{
      //formattedTime = "00:00:00.0";
      formattedTime = "PT0H0M0S";
   }

   doSetValue( "cmi.session_time", formattedTime );
   
      var studid = doGetValue("cmi.learner_id");
    // window.alert(studid + "這次學習您在本單元主題停留了" + formattedTime) ;
  
}


function convertTotalSeconds(ts){
   var sec = (ts % 60);

   ts -= sec;
   var tmp = (ts % 3600);  //# of seconds in the total # of minutes
   ts -= tmp;              //# of seconds in the total # of hours

   // convert seconds to conform to CMITimespan type (e.g. SS.00)
   sec = Math.round(sec*100)/100;
   
   var strSec = new String(sec);
   var strWholeSec = strSec;
   var strFractionSec = "";

   if (strSec.indexOf(".") != -1)
   {
      strWholeSec =  strSec.substring(0, strSec.indexOf("."));
      strFractionSec = strSec.substring(strSec.indexOf(".")+1, strSec.length);
   }
   
   if (strWholeSec.length < 2)
   {
      strWholeSec = "0" + strWholeSec;
   }
   strSec = strWholeSec;
   
   if (strFractionSec.length)
   {
      strSec = strSec+ "." + strFractionSec;
   }


   if ((ts % 3600) != 0 )
      var hour = 0;
   else var hour = (ts / 3600);
   if ( (tmp % 60) != 0 )
      var min = 0;
   else var min = (tmp / 60);

   if ((new String(hour)).length < 2)
      hour = "0"+hour;
   if ((new String(min)).length < 2)
      min = "0"+min;

   //var rtnVal = hour+":"+min+":"+strSec; 
   var rtnVal = "PT" + hour + "H" + min + "M" + Math.round(strSec) + "S";

   return rtnVal;
}


function doBack(){

   doSetValue( "cmi.exit", "suspend" );

   computeTime();
   exitPageStatus = true;
   
   var result;
   result = doCommit();

  // NOTE: LMSFinish will unload the current SCO.  All processing
  //       relative to the current page must be performed prior
  //     to calling LMSFinish.   
   
   result = doFinish();

}

function doContinue( status ){
   // Reinitialize Exit to blank
   doSetValue( "cmi.exit", "" );

   var mode = doGetValue( "cmi.mode" );

   if ( mode != "review"  &&  mode != "browse" ){
      doSetValue( "cmi.completion_status", status );
   }
 
   computeTime();
   exitPageStatus = true;
   
   var result;
   result = doCommit();
  // NOTE: LMSFinish will unload the current SCO.  All processing
  //       relative to the current page must be performed prior
  //     to calling LMSFinish.   

   result = doFinish();

}


function checkLocation( current_location ){  
     
   var result = doInitialize();
   
   exitPageStatus = false;
     
   
   var location = doGetValue( "cmi.location");

   if ( location == "" ){
       doSetValue( "cmi.location", current_location );
   }else if ( location != current_location ){
       exitPageStatus = true;
       document.location.href = location;
   }
      
}

function setLocation( current_location ){   
     doSetValue( "cmi.location", current_location );
}


/*******************************************************************************
** The purpose of this function is to handle cases where the current SCO may be 
** unloaded via some user action other than using the navigation controls 
** embedded in the content.   This function will be called every time an SCO
** is unloaded.  If the user has caused the page to be unloaded through the
** preferred SCO control mechanisms, the value of the "exitPageStatus" var
** will be true so we'll just allow the page to be unloaded.   If the value
** of "exitPageStatus" is false, we know the user caused to the page to be
** unloaded through use of some other mechanism... most likely the back
** button on the browser.  We'll handle this situation the same way we 
** would handle a "quit" - as in the user pressing the SCO's quit button.
*******************************************************************************/
function unloadPage(){    
    
  if (exitPageStatus != true){
    //1080128 - checkStatus()需放在doQuit()上方才不會出現錯誤造成alert()："store data after termination"
    checkStatus();
    doQuit();
  }

  // NOTE:  don't return anything that resembles a javascript
  //      string from this function or IE will take the
  //      liberty of displaying a confirm message box.
  
}

function doQuit(){   

  computeTime();

   doSetValue( "cmi.exit", "suspend" );
   
   exitPageStatus = true;
   
   var result;

  // NOTE: Terminate will unload the current SCO.  All processing
  //       relative to the current page must be performed prior
  //     to calling Terminate.   


  totalTime = doGetValue("cmi.total_time");
   result = doTerminate();
   
}

function checkStatus(){
  //1080128 - 隱藏
  // yyy = ISODurationToCentisec(totalTime);

  // if(yyy>=6000){
  //  doSetValue( "cmi.completion_status", "completed" );
  // }

  //1071206 - loadPage() 和 checkStatus() 都要擺放這兩行。session_time 和 total_time 紀錄才會出現。
  doSetValue("cmi.success_status", "passed");
  doSetValue("cmi.completion_status", "completed");

  //doSetValue( "adl.nav.request", "continue" );
  
}


// ========= TIME AND DURATION FUNCTIONS ========
function centisecsToISODuration(n, bPrecise){
  // Note: SCORM and IEEE 1484.11.1 require centisec precision
  // Parameters:
  // n = number of centiseconds
  // bPrecise = optional parameter; if true, duration will
  // be expressed without using year and/or month fields.
  // If bPrecise is not true, and the duration is long,
  // months are calculated by approximation based on average number
  // of days over 4 years (365*4+1), not counting the extra days
  // for leap years. If a reference date was available,
  // the calculation could be more precise, but becomes complex,
  // since the exact result depends on where the reference date
  // falls within the period (e.g. beginning, end or ???)
  // 1 year ~ (365*4+1)/4*60*60*24*100 = 3155760000 centiseconds
  // 1 month ~ (365*4+1)/48*60*60*24*100 = 262980000 centiseconds
  // 1 day = 8640000 centiseconds
  // 1 hour = 360000 centiseconds
  // 1 minute = 6000 centiseconds
  var str = "P";
  var nCs=n;
  var nY=0, nM=0, nD=0, nH=0, nMin=0, nS=0;
  n = Math.max(n,0); // there is no such thing as a negative duration
  var nCs = n;
  // Next set of operations uses whole seconds
  with (Math)
  {
    if (bPrecise == true)
    {
      nD = floor(nCs / 8640000);
    }
    else
    {
      nY = floor(nCs / 3155760000);
      nCs -= nY * 3155760000;
      nM = floor(nCs / 262980000);
      nCs -= nM * 262980000;
      nD = floor(nCs / 8640000);
    }
    nCs -= nD * 8640000;
    nH = floor(nCs / 360000);
    nCs -= nH * 360000;
    var nMin = floor(nCs /6000);
    nCs -= nMin * 6000
  }
  // Now we can construct string
  if (nY > 0) str += nY + "Y";
  if (nM > 0) str += nM + "M";
  if (nD > 0) str += nD + "D";
  if ((nH > 0) || (nMin > 0) || (nCs > 0))
  {
    str += "T";
    if (nH > 0) str += nH + "H";
    if (nMin > 0) str += nMin + "M";
    if (nCs > 0) str += (nCs / 100) + "S";
  }
  if (str == "P") str = "PT0H0M0S";
  // technically PT0S should do but SCORM test suite assumes longer form.
  return str;
}


function startTimer(){
   startDate = new Date().getTime();
}

function ISODurationToCentisec(str){
  // Only gross syntax check is performed here
  // Months calculated by approximation based on average number
  // of days over 4 years (365*4+1), not counting the extra days
  // in leap years. If a reference date was available,
  // the calculation could be more precise, but becomes complex,
  // since the exact result depends on where the reference date
  // falls within the period (e.g. beginning, end or ???)
  // 1 year ~ (365*4+1)/4*60*60*24*100 = 3155760000 centiseconds
  // 1 month ~ (365*4+1)/48*60*60*24*100 = 262980000 centiseconds
  // 1 day = 8640000 centiseconds
  // 1 hour = 360000 centiseconds
  // 1 minute = 6000 centiseconds
  var aV = new Array(0,0,0,0,0,0);
  var bErr = false;
  var bTFound = false;
  if (str.indexOf("P") != 0) bErr = true;
  if (!bErr)
  {
    var aT = new Array("Y","M","D","H","M","S")
    var p=0, i=0;
    str = str.substr(1); //get past the P
    for (i = 0 ; i < aT.length; i++)
    {
      if (str.indexOf("T") == 0)
      {
        str = str.substr(1);
        i = Math.max(i,3);
        bTFound = true;
      }
      p = str.indexOf(aT[i]);
      //alert("Checking for " + aT[i] + "\nstr = " + str);
      if (p > -1)
      {
        // Is this a M before or after T?
        if ((i == 1) && (str.indexOf("T") > -1) && (str.indexOf("T") < p)) continue;
        if (aT[i] == "S")
        {
          aV[i] = parseFloat(str.substr(0,p))
        }
        else
        {
          aV[i] = parseInt(str.substr(0,p))
        }
        if (isNaN(aV[i]))
        {
          bErr = true;
          break;
        }
        else if ((i > 2) && (!bTFound))
        {
          bErr = true;
          break;
        }
        str = str.substr(p+1);
      }
    }
    if ((!bErr) && (str.length != 0)) bErr = true;
    //alert(aV.toString())
  }
  if (bErr)
  {
    //alert("Bad format: " + str)
    return
  }
  return aV[0]*3155760000 + aV[1]*262980000
    + aV[2]*8640000 + aV[3]*360000 + aV[4]*6000
    + Math.round(aV[5]*100)
}

//
function initMethod(){
  
    //1050510 - chrome本機安全性 - top.document.location.href
    try {
        var currentPath = top.document.location.href;
        var allowScorm = false;
        //alert(currentPath);


        //=========================================================================★
        //1071218 - 強制打開Scorm機制
        if( scormState === 'open' ){
          allowScorm = true;

        //=========================================================================★
        //1071218 - 用條件式判斷是否打開Scorm機制 - 根據網址字串是否有"mod_scorm" 或 "scorm" 或 "moodle"
        }else if( scormState === 'conditional' ){
          //
          if( currentPath.match("mod_scorm") !== null || currentPath.match("scorm") !== null || currentPath.match("moodle") !== null ){
            allowScorm = true;
          }

        //1071218 - 強制關閉Scorm機制
        //=========================================================================★
        }else if( scormState === 'close' ){
          allowScorm = false;
        }
        //=========================================================================★


        
    }catch(err){
        //
    }
  

    if( allowScorm ){ 
        //●●●1050419 - ※unload皆改成※beforeunload，否則有錯誤。 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        //Synchronous XMLHttpRequest on the main thread is deprecated because of its detrimental effects to the end user's experience. For more help, check https://xhr.spec.whatwg.org/.
        //http://localhost/moodle291p/lib/javascript.php/1439880522/mod/scorm/request.js
        //function DoRequest(httpReq,url,param){httpReq.open("POST",url,false);httpReq.setRequestHeader('Content-Type','application/x-www-form-urlencoded');try{httpReq.send(param)}catch(e){return false};if(httpReq.status==200){return httpReq.responseText}else return httpReq.status}
        
        //●●●1050419 - ※unload皆改成※beforeunload，否則有錯誤。 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

        //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
        if (window.addEventListener) {
          // DOM2 standard
          window.addEventListener("load", loadPage, false);
          window.addEventListener("beforeunload", unloadPage, false); 
          //1071206 - 有pagehide事件，從一個SCO頁面離開時，才能出現標註已瀏覽的icon。(包括點擊其他選單SCO項目、refresh、關閉瀏覽器)
          window.addEventListener("pagehide", unloadPage, false);
        }else if (window.attachEvent) {
          // Microsoft's precursor to it, IE8 and earlier
          window.attachEvent("onload", loadPage);
          window.attachEvent("onbeforeunload", unloadPage);
          //1071206 - 有pagehide事件，從一個SCO頁面離開時，才能出現標註已瀏覽的icon。(包括點擊其他選單SCO項目、refresh、關閉瀏覽器)
          window.attachEvent("onpagehide", unloadPage);
        }else {
          // Some pre-1999 browser
          window.onload = loadPage();
          window.beforeunload = unloadPage();
          //1071206 - 有pagehide事件，從一個SCO頁面離開時，才能出現標註已瀏覽的icon。(包括點擊其他選單SCO項目、refresh、關閉瀏覽器)
          window.pagehide = unloadPage();
        }
        //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

    }


}
