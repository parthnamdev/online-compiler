# Online-Compiler
An Online Compiler Web Application for C/C++ and Java


An Online Compiler Web Application is a type of a web application designed primarily for online code writing, 
compiling and execution in various different languages. One can use the browser itself for the purpose of Coding. 

Objective
1.	To develop a user friendly GUI for ONLINE COMPILER compatible with most web browsers.
2.	To develop the server back-end to get the user written code and compile and execute it and return the output to the user.
3.	This ONLINE COMPILER will support 3 different languages, C, C++ and Java.

Hardware and Software Requirements

•	Pentium or above Processor
•	100MB of free-hard drive space
•	2GB of RAM

Client Side
•	Operating system: Any
•	Web Browser:- Microsoft Edge, Mozilla Firefox, Google Chrome and Safari
Server Side
•	Drivers:- Node JS compiler
•	Node Js dependencies to be installed as specified in package.JSON 
•	ACE-EDITOR must be downloaded and placed in Views folder
•	MINGW compiler and the JAVA JDK must be Installed on the server side with Global environment variables for universal access of Compilers.

Proposed Methodology:-
1.	When the server is turned on. The client and users will be able to access it on the internet or localnet.
2.	The Client/User will write Their Code and select their preferred coding language and run the code.
3.	The Web Application will get the Client/User code from the website and send it to Client Side using a POST method form.
4.	The server side will get the RAW CODE and the coding language selected by the user and then write the Code in a TEMPORARY FILE and save it with specific extension.
5.	The Server Side will now start a CHILD PROCESS which will now call the specific compiler (MinGW for C/C++ and Java for java) as selected by the user and compile the CODE FILE. 
6.	If the Compilation is NOT SUCCESSFUL then With the help of Pipe Streams it will extract the error messages and then pass it to the Client side for them to Debug their code.
7.	If the Compilation is SUCCESSFUL then Another Child Process will be called which will execute the EXECUTABLE file created after compilation. 
8.	If INPUTS Are given they will be passed to the execution with the help of Pipe Streams as Standard inputs the program. The Standard OUTPUT then will be extracted with the help of pipe streams again.

9.	The Outputs will now be sent back to the Webpage for the client/user to view.
