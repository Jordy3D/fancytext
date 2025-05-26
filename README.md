<div align="center">
    <h1>fancytext</h1>
    <p>generate fancy text for whatever reason</p>
</div>

## about

type in some text here,  
pick the style you like best,  
and you're good to go.

more styles will be added as i think of them or find them

## usage
1. type in some text
2. enter a comment style (optional)
3. pick a style from the dropdown

### comments

you can prefix your text with a comment style to make it easier to copy and paste into your code.  
the following comment styles are supported:

#### specific comment styles

- multi-line block comment (`/***`):
  ```cs
  /***
   * █ █ █▀█ █ █ █▀█   ▀█▀ █▀▀ ▀▄▀ ▀█▀ 
   *  █  █▄█ █▄█ █▀▄    █  ██▄ █ █  █  
   */
  ```

- html comment (`<!--`):
  ```html
  <!--
  █ █ █▀█ █ █ █▀█   ▀█▀ █▀▀ ▀▄▀ ▀█▀ 
   █  █▄█ █▄█ █▀▄    █  ██▄ █ █  █  
  -->
  ```

- lua-style block comment (`--[[`):
  ```lua
  --[[
  █ █ █▀█ █ █ █▀█   ▀█▀ █▀▀ ▀▄▀ ▀█▀ 
   █  █▄█ █▄█ █▀▄    █  ██▄ █ █  █  
  --]]
  ```

- bash echo commands (`echo "`):
  ```bash
  echo "█ █ █▀█ █ █ █▀█   ▀█▀ █▀▀ ▀▄▀ ▀█▀ ";
  echo " █  █▄█ █▄█ █▀▄    █  ██▄ █ █  █  ";
  ```

  #### generic comment styles

  these will work with any generic input. Entering any string followed by an asterisk will make it a block comment,
  
- single line comments (`//`, `#`, etc.):
  ```js
  // █ █ █▀█ █ █ █▀█   ▀█▀ █▀▀ ▀▄▀ ▀█▀ 
  //  █  █▄█ █▄█ █▀▄    █  ██▄ █ █  █  
  ```
  ```python
  # █ █ █▀█ █ █ █▀█   ▀█▀ █▀▀ ▀▄▀ ▀█▀ 
  #  █  █▄█ █▄█ █▀▄    █  ██▄ █ █  █  
  ```
  ```bat
  REM █ █ █▀█ █ █ █▀█   ▀█▀ █▀▀ ▀▄▀ ▀█▀ 
  REM  █  █▄█ █▄█ █▀▄    █  ██▄ █ █  █  
  ```

- block comment (`/*`):
  ```js
  /*
  █ █ █▀█ █ █ █▀█   ▀█▀ █▀▀ ▀▄▀ ▀█▀ 
   █  █▄█ █▄█ █▀▄    █  ██▄ █ █  █  
  */
  ```

just type your preferred comment style in the comment field and it'll format accordingly.


## credits

Big Block and Big Block Clean are based on [figlet fonts by xero](https://github.com/xero/figlet-fonts), modified and expanded by me.  
The whole project is inspired by [PatorJK's Text to ASCII Art Generator](http://patorjk.com/software/taag/), initially made a while ago when his site was down.