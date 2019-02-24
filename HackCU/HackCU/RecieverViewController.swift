//
//  RecieverViewController.swift
//  HackCU
//
//  Created by Harshpal Bhirth on 24/02/2019.
//  Copyright © 2019 Harshpal Bhirth. All rights reserved.
//
import UIKit

class RecieverViewController: UIViewController {
    @IBOutlet weak var username: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        username.text = ""
    }
    
    @IBAction func zeroPressed(_ sender: Any) {
        var text = username.text
        text?.append("0")
        username.text = text
    }
    
    @IBAction func onePressed(_ sender: Any) {
        var text = username.text
        text?.append("1")
        username.text = text
    }
    
    @IBAction func nextPressed(_ sender: Any) {
        UserDefaults.standard.set(username.text, forKey: "reciever")
    }
}
