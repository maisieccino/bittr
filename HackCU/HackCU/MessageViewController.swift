//
//  MessageViewController.swift
//  HackCU
//
//  Created by Harshpal Bhirth on 24/02/2019.
//  Copyright © 2019 Harshpal Bhirth. All rights reserved.
//

import UIKit
import Alamofire

class MessageViewController: UIViewController {

    @IBOutlet weak var message: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        message.text = ""
    }
    
    @IBAction func zeroPressed(_ sender: Any) {
        var text = message.text
        text?.append("0")
        message.text = text
    }
    
    @IBAction func onePressed(_ sender: Any) {
        var text = message.text
        text?.append("1")
        message.text = text
    }
    
    @IBAction func sendPressed(_ sender: Any) {
        let url = "https://651bbf54.ngrok.io/send"
        
        let to = UserDefaults.standard.value(forKey: "reciever") as! String
        let from = UserDefaults.standard.value(forKey: "username") as! String
        
        let parameters: Parameters = ["to": to , "from": from, "msg": message.text]

        Alamofire.request(url, method: .post, parameters: parameters)
    }
}

