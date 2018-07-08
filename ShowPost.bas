B4A=true
Group=Default Group
ModulesStructureVersion=1
Type=Activity
Version=8
@EndOfDesignText@
#Region  Activity Attributes 
	#FullScreen: False
	#IncludeTitle: False
#End Region

Sub Process_Globals
	'These global variables will be declared once when the application starts.
	'These variables can be accessed from all modules.

End Sub

Sub Globals
	'These global variables will be redeclared each time the activity is created.
	'These variables can only be accessed from this module.
	Private wvPost As WebView
	Private lblTitle As Label
	Private lblBack As Label
	Private lblShare As Label
End Sub

Sub Activity_Create(FirstTime As Boolean)
	'Do not forget to load the layout file created with the visual designer. For example:
	Activity.LoadLayout("ShowPost")
	lblTitle.Text = Main.ChosenPostTitle
	'Log(Main.ChosenPostBody)
	Dim ThisHTML As String
	'AuthorIMG = "https://cdn.steemitimages.com/u/"& Main.ChosenPostAuthor &"/avatar"
	ThisHTML = File.ReadString(File.DirAssets, "post.html").Replace("%postusername%", Main.ChosenPostAuthor).Replace("%postcontent%", Main.ChosenPostBody).Replace("%posttime%",  Main.ChosenPostCreated).Replace("%totalpp%", Main.ChosenPostPPV).Replace("%totalupvotes%", Main.ChosenUpvotedBy).Replace("%postcomments%", Main.ChosenPostReplies)
	'Log(AuthorIMG)
	'Log(ThisHTML)
	wvPost.LoadHtml(ThisHTML)
End Sub

Sub Activity_Resume

End Sub

Sub Activity_Pause (UserClosed As Boolean)
	'wvPost.LoadHtml("")
End Sub


Sub lblBack_Click
	Activity.Finish
End Sub

Sub lblShare_Click
	Dim i As Intent
	i.Initialize(i.ACTION_SEND, "")
	i.SetType("text/plain")
	i.PutExtra("android.intent.extra.TEXT", Main.ChosenPostURL)
	i.WrapAsIntentChooser("Share Post")
	StartActivity(i)
End Sub

Sub wvPost_OverrideUrl (Url As String) As Boolean'ignore
	Log(Url)
	If Url.StartsWith("https://steemiapp.dimitrisp.eu") Or Url.StartsWith("https://steemi.app") Then
		' These should be shown inside the app
	Else
		Dim i As Intent
		i.Initialize(i.ACTION_VIEW, Url)
		StartActivity(i)
	End If
	Return True
End Sub