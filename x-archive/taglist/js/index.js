Element `kurt-tagger`
 
(class TagArea extends HTMLElement 
 { 
   constructor(){
     super();
     var t = kurtTaggerTemplate;
     this._text = this.textContent;
     this.textContent = '';
      var clone = document.importNode(t.content, true);
  this.appendChild(clone);
     this.area = document.querySelector(`#${this.id} .tagArea`);
     this.area.textContent = this._text;     
     this.tagList = document.querySelector(`#${this.id} .tagList`);
     this.area.contentEditable=true;
     this._tags = [];
     this.determineTags();
     this.selectedTerm="";
   }
 
   get tags(){return this._tags;}
   get text(){return this.area.textContent}
   set text(newText){
     this.area.textContent = newText;
   this._tags = [];
   this._oldText = '';
   this.determineTags();
   }
   
   oninput(){this.determineTags()}
   
   determineTags(){
      
      var text = this.area.textContent;
     if (text != this._oldText){ 
     var oldTags = this._tags.slice();
      var matches = text.match(/#(\w+)\W/g);
      if (matches){
      this._tags = matches.map((match)=>match.substr(1,match.length-2).toLowerCase().replace('_',' '));
      this._tags.sort();
      this._tags = this._tags.filter((entry,index,arr)=>(index>0)?entry != arr[index-1]:true);
     var output = this._tags.map((tag)=>`<span class="tag" onclick="${this.id}.onTagClick('${tag}')" data-selected='false'>${tag}</span>`).join(' ');
   this.tagList.innerHTML=output;
   var isSame = this._tags.filter((tag,index)=>tag == oldTags[index]).length == this._tags.length;
   if (!isSame){     
      this.onupdate({text:this.text,tags:this.tags})
        }
      }
     }
     this._oldText = text
    }
  onupdate(obj){return obj};
  onclick(evt){
    var elt = evt.target; 
    if (elt.className==='tag'){
      var term = elt.textContent;
      var tags = document.querySelectorAll(`#${this.id} .tag`)
    tags.forEach((tag)=>{tag.dataset.selected= (tag.textContent == term)?'true':'false';

        });
      
      }
    }
 })

Element `kurt-defs` 

(class Defs extends HTMLElement 
 {
   constructor(){
     super();  
     const t = kurtDefsTemplate;
     var clone = document.importNode(t.content, true);
     this.appendChild(clone);
     this.termsTemplate =  Template `term`;
     this.defsTemplate = Template `defs`;
     this.style.display='none'; 
    }
   
   load(obj){
      this.base=obj;
      var entries = this.base.entry_list.entry;
     if (!this.base.entry_list.suggestion){
      var entries = Array.isArray(entries)?entries:[entries]
//      var context = [{ew:"First"},{ew:"Second"}];
     var name = entries[0].ew;
     var pos = "["+entries[0].fl+"]";
     var pronounce =entries[0].pr;      
     var et =entries[0].et+""; this.termsTemplate.bind({
       name:name,
       pos:pos,
       pr:pronounce,
       et:et
     });
        
     var defs =  Array.from((""+entries[0].def.dt)
         .split(/[:]/).slice(1))
         .filter((item)=>(item.length>5))
         .map((item)=>{return {def:item}});
      
      this.defsTemplate.bind(defs);                                       this.style.display='block'; 
                                                    
     }
     else {this.style.display="none"}
    }
   });
   
Element `kurt-suggest` 

(class Suggests extends HTMLElement 
 {
   constructor(){
     super();  
     const t = suggestTemplate;
     var clone = document.importNode(t.content, true);
     this.appendChild(clone);
     this.suggestionsTemplate = Template `suggestionsTemplate`;
     this.suggestHeader = Template `suggestHeader`;
   }
   load(obj){
      this.base=obj;
      this.suggestHeader.bind(obj)
      var suggestions = this.base.entry_list.suggestion
      if (suggestions){
        var context = suggestions.map((suggestion)=>{return {suggestion:suggestion}})
        console.log(suggestions)
        this.suggestionsTemplate.bind(context); 
 this.style.display = "block";
      }
   else {this.style.display = "none"}
   }
 });
   


function App(){
  tag1.onupdate=(obj)=>console.log(obj.tags);
  //tag1.text =""
  var apiCall = (term)=>`https://www.dictionaryapi.com/api/v1/references/collegiate/xml/${term}?key=2e31617d-f094-471a-82f6-f49eb16d532f`;
  tag1.onTagClick=(term)=>{
    fetch(apiCall(term))
      .then((response)=>response.text())
      .then((xml)=>{
        //console.log(xml);
        var x2js = new X2JS();

  var jsonObj = x2js.xml_str2json( xml );
      jsonObj["term"]=term;
      defs1.load(jsonObj);
      suggest1.load(jsonObj);
    })};
}

// Invoke the App
App();