/*******************************************************************
*
* File    : JSFX_Fireworks3.js � JavaScript-FX.com
*
* Created : 2001/10/26
*
* Author  : Roy Whittle www.Roy.Whittle.com
*
* Purpose : To create a fire like mouse trailer. Can be customized to
*		look like a "Comet", "Rocket", "Sparkler" or "Flaming Torch"
*
* Requires	: JSFX_Layer.js - for layer creation, movement
*		: JSFX_Mouse.js - to track the mouse x,y coordinates
*
* History
* Date         Version        Description
*
* 2001-10-26	1.0		Created for javascript-fx
***********************************************************************/

var hexDigit=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
function dec2hex(dec)
{
	return(hexDigit[dec>>4]+hexDigit[dec&15]);
}
function hex2dec(hex)
{
	return(parseInt(hex,16))
}

/*** Class FireworkSpark extends Layer ***/
JSFX.FireworkSpark = function(x, y)
{
	//Call the superclass constructor
	this.superC	= JSFX.Layer;
	this.superC("+");

	this.dx 	= Math.random() * 4 - 2;
	this.dy	= Math.random() * 4 - 2;
	this.ay	= .09;
	this.x	= x;
	this.y	= y;
	this.type = 0;
}
JSFX.FireworkSpark.prototype = new JSFX.Layer;
/*** END Class FireworkSpark Constructor - start methods ***/
JSFX.FireworkSpark.prototype.fire0 = function()
{
	var a = Math.random() * 6.294;
	var s = Math.random() * 2;
	if(Math.random() >.6) s = 2;
	this.dx = s*Math.sin(a);
	this.dy = s*Math.cos(a) - 2;
}
JSFX.FireworkSpark.prototype.fire1 = function()
{
	var a = Math.random() * 6.294;
	var s = Math.random() * 2;
	this.dx = s*Math.sin(a);
	this.dy = s*Math.cos(a) - 2;
}
JSFX.FireworkSpark.prototype.fire2 = function()
{
	var a = Math.random() * 6.294;
	var s = 2;
	this.dx = s*Math.sin(a);
	this.dy = s*Math.cos(a) - 2;
}
JSFX.FireworkSpark.prototype.fire3 = function()
{
//	this.dx = Math.random()*2 - 1;
//	this.dy = - 2 - Math.random()*4;
	var a = Math.random() * 6.294;
	var s = a - Math.random();
	this.dx = s*Math.sin(a);
	this.dy = s*Math.cos(a) - 2;
}
JSFX.FireworkSpark.prototype.fire4 = function()
{
	var a = Math.random() * 6.294;
	var s = (Math.random() > 0.5) ? 2 : 1;
	if(s == 1)
		this.setFwColor = this.setFwColorR;
	else
		this.setFwColor = this.setFwColorG;
	s -= Math.random()/4;
	this.dx = s*Math.sin(a);
	this.dy = s*Math.cos(a) - 2;
}
JSFX.FireworkSpark.prototype.fire = function(sx, sy, fw, cl)
{
	if(cl==1)
		this.setFwColor = this.setFwColorR;
	else if(cl==2)
		this.setFwColor = this.setFwColorC;
	else if(cl==3)
		this.setFwColor = this.setFwColorG;
	else if(cl==4)
		this.setFwColor = this.setFwColorW;
	else
		this.setFwColor = this.setFwColorY;

	if(fw == 1)
		this.fire1();
	else if(fw == 2)
		this.fire2();
	else if(fw == 3)
		this.fire3();
	else if(fw == 4)
		this.fire4();
	else
		this.fire0();

	this.x	= sx;
	this.y	= sy;
	this.moveTo(sx, sy);
}
JSFX.FireworkSpark.prototype.setFwColor = function(color)
{
	this.setFwColorY(color);
}
JSFX.FireworkSpark.prototype.setFwColorR = function(color)
{
	var hex = dec2hex(color);
	var str = "#" + hex + "0000";
	this.setBgColor(str);
}
JSFX.FireworkSpark.prototype.setFwColorG = function(color)
{
	var hex = dec2hex(color);
	var str = "#" + "00" + hex + "00";
	this.setBgColor(str);
}
JSFX.FireworkSpark.prototype.setFwColorC = function(color)
{
	var hex = dec2hex(color);
	var str = "#" + "00" + hex + hex;
	this.setBgColor(str);
}
JSFX.FireworkSpark.prototype.setFwColorY = function(color)
{
	var hex = dec2hex(color);
	var str = "#" + hex + hex + "00";
	this.setBgColor(str);
}
JSFX.FireworkSpark.prototype.setFwColorW = function(color)
{
	var hex = dec2hex(color);
	var str = "#" + hex + hex + hex;
	this.setBgColor(str);
}
JSFX.FireworkSpark.prototype.animate = function(step)
{
	var color = (step < 30) ? 255-(step*4) : Math.random()*(356-(step*4));
	this.setFwColor(color);

	this.dy += this.ay;
	this.x += this.dx;
	this.y += this.dy;
	this.moveTo(this.x, this.y);
}
/*** END Class FireworkSpark Methods***/

/*** Class FireObj extends Object ***/
JSFX.FireObj = function(numStars, x, y)
{
	this.id = "JSFX_FireObj_"+JSFX.FireObj.count++;
	this.sparks = new Array();
	for(i=0 ; i<numStars; i++)
	{
		this.sparks[i]=new JSFX.FireworkSpark(x,y);
		this.sparks[i].clip(0,0,3,3);
		this.sparks[i].setBgColor("yellow");
		this.sparks[i].show();
	}
	this.step = 0;
	window[this.id]=this;
	this.animate();
}
JSFX.FireObj.count = 0;
JSFX.FireObj.prototype.explode = function()
{
	var x = 50 + (Math.random()*(JSFX.Browser.getMaxX() - 200));
	var y = 50 + (Math.random()*(JSFX.Browser.getMaxY() - 200));
	var fw = Math.floor(Math.random() * 5);
	var cl = Math.floor(Math.random() * 5);

	for(i=0 ; i<this.sparks.length ; i++)
		this.sparks[i].fire(x, y, fw, cl);
}
JSFX.FireObj.prototype.animate = function()
{
	setTimeout("window."+this.id+".animate()", 40);

	if(this.step > 50)this.step = 0;
	if(this.step == 0)this.explode();

	this.step++;

	for(i=0 ; i<this.sparks.length ; i++)
		this.sparks[i].animate(this.step);

}
/*** END Class FireObj***/

/*** Create a static method for creating fire objects ***/
JSFX.Fire = function(numStars, x, y)
{
	return new JSFX.FireObj(numStars, x, y);
}

/*** If no other script has added it yet, add the ns resize fix ***/
if(navigator.appName.indexOf("Netscape") != -1 && !document.getElementById)
{
	if(!JSFX.ns_resize)
	{
		JSFX.ow = outerWidth;
		JSFX.oh = outerHeight;
		JSFX.ns_resize = function()
		{
			if(outerWidth != JSFX.ow || outerHeight != JSFX.oh )
				location.reload();
		}
	}
	window.onresize=JSFX.ns_resize;
}
